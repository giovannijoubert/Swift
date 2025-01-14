# frequentItemsets Module - uses the apriori algorithm to find items that are often purchased together
import sys
import json
sys.path.append('..') #import from parent directory
from functools import lru_cache
import api
import db
from flask import jsonify

@lru_cache(maxsize=100)
def retrieveOrderData():
    connection = db.connect()
    cursor = connection.cursor()
    cursor.execute("SELECT customerorder.orderid, customerid,  itemordered.menuitemid, menuitem.menuitemname, menuitem.restaurantid, quantity FROM itemordered" +
                    " INNER JOIN customerorder" +
                    " ON customerorder.orderid = itemordered.orderid" +
                    " INNER JOIN menuitem" +
                    " ON menuitem.menuitemid = itemordered.menuitemid;")
    records = cursor.fetchall()
    cursor.close()
    db.close(connection)
    return records

#restaurantID & #menuItemname

#cache record data on Server start
retrieveOrderData()

#clear and reload RatingsCache each time a new rating is added
def clearOrdersCache():
    retrieveOrderData.cache_clear()
    retrieveOrderData() #slow to execute
    return {'message': 'Cache Cleared'}

def Apriori(restaurantId, viz = False):
    import pandas as pd
    from mlxtend.frequent_patterns import apriori
    from mlxtend.frequent_patterns import association_rules
    from mlxtend.preprocessing import TransactionEncoder

    #read and filter the data
    orders_df =  pd.DataFrame.from_records(retrieveOrderData())
    orders_df.columns = ['orderId','customerId', 'menuItemId', 'menuItemName', 'restaurantId', 'quantity']
    #orders_df = orders_df.dropna()
    orders_df = orders_df.loc[orders_df['restaurantId'] == restaurantId]
    if(len(orders_df) < 5):
        api.notFound("Not enough orders")

    #convert to a basket of orderId (row) x menuItemId (col) (which items are present in which orders)
    if(viz): #if this is a visualization call, use menuItemName instead of ID
        orderBasket = (orders_df.groupby(['orderId', 'menuItemName'])['quantity']
                .sum().unstack().reset_index().fillna(0)
                .set_index('orderId'))
    else:
        orderBasket = (orders_df.groupby(['orderId', 'menuItemId'])['quantity']
            .sum().unstack().reset_index().fillna(0)
            .set_index('orderId'))
    
    #convert all values >=1 to 1 and all <=0 to 0
    def encodeData(x):
        if x <= 0:
            return 0
        if x >= 1:
            return 1
    basket_sets = orderBasket.applymap(encodeData)
    
    #apply mlxtend apriori to the basket, items need to occur together in an order 
    #for at least 1.5% of all orders in database
    frequent_itemsets = apriori(basket_sets, min_support=0.015, max_len=3, use_colnames=True, low_memory=True)
    frequent_itemsets.sort_values('support', ascending=False)

    associationRules = association_rules(frequent_itemsets, metric="lift", min_threshold=0)

    #sort association by lift then confidence, return top 20
    associationRules = (associationRules.sort_values(['lift', 'confidence'], ascending=False))[0:20]

    if(viz):
        return associationRules
    #group all of the top associated items
    groupedItems = []

    for indx in associationRules.index: 
        group = {}
        group["confidence"] = associationRules["confidence"][indx]
        antecedents =[]
        for antecedent in associationRules["antecedents"][indx]:
            antecedents.append(antecedent)
        group["antecedents"] = antecedents

        consequents = []
        for consequent in associationRules["consequents"][indx]:
            consequents.append(consequent)
        group["consequents"] = consequents
        groupedItems.append(group)
    
    return jsonify(groupedItems)