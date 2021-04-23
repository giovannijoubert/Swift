
/* checkin history */
CREATE OR REPLACE FUNCTION log_checkin() RETURNS TRIGGER AS
$$
    BEGIN
        IF(NEW.checkedin is NULL) THEN
            INSERT INTO checkedinhistory VALUES(now(), (SELECT restaurantid FROM restauranttable WHERE qrcode = OLD.checkedin), 'checkout');
		ELSE
            INSERT INTO checkedinhistory VALUES(now(), (SELECT restaurantid FROM restauranttable WHERE qrcode = NEW.checkedin), 'checkin');
        END IF;

        RETURN NEW;
    END
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_checkedin
    AFTER UPDATE OF checkedin ON person
    FOR EACH ROW
        EXECUTE PROCEDURE log_checkin();

CREATE TABLE checkedinhistory(
    dateTime TIMESTAMP,
    restaurantId INTEGER,
    operation TEXT,
)

/* table occupancy history */
CREATE TABLE tableoccupancyhistory(
    dateTime TIMESTAMP,
    restaurantId INTEGER,
    totaltables BIGINT,
    occupied BIGINT,
    totalseats BIGINT,
    totalcustomers BIGINT
)

CREATE OR REPLACE FUNCTION log_tableoccupancy() RETURNS TRIGGER AS
$$
    DECLARE resID INTEGER;
    BEGIN

        IF(NEW.checkedin is NULL) THEN /*checkout */
         resID = (SELECT restaurantid FROM restauranttable WHERE qrcode = OLD.checkedin);
		ELSE
         resID = (SELECT restaurantid FROM restauranttable WHERE qrcode = NEW.checkedin);
        END IF;

        INSERT INTO tableoccupancyhistory VALUES(now(), resID, (SELECT COUNT(*) AS TotalTables from restauranttable
                        WHERE restaurantid = resID), (SELECT COUNT(DISTINCT tablenumber) as Occupied from restauranttable
                        INNER JOIN person
                        ON person.checkedin = restauranttable.qrcode
                        WHERE restaurantid = resID), (SELECT sum(numseats) as totalseats from restauranttable
						WHERE restaurantid = resID), (SELECT count(*) as currentlycheckedin from restauranttable
						INNER JOIN person
						ON person.checkedin = restauranttable.qrcode
						WHERE restaurantid = resID));

        RETURN NEW;
    END
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tableoccupancy
    AFTER UPDATE OF checkedin ON person
    FOR EACH ROW
        EXECUTE PROCEDURE log_tableoccupancy();

SELECT topMenuItems(62,7,0) as currentPeriod, topMenuItems(62,14,7) as previousPeriod;

CREATE OR REPLACE FUNCTION topMenuItems(INTEGER, INTEGER, INTEGER) RETURNS TABLE(menuitemname text, totalpurchased bigint, ratio numeric) AS
$$
    BEGIN 
        RETURN QUERY SELECT menuitem.menuitemname, SUM(quantity) as totalpurchased, TRUNC((SUM(quantity)::numeric/(SELECT SUM(quantity) from itemordered
        INNER JOIN menuitem
        ON menuitem.menuitemid = itemordered.menuitemid
        INNER JOIN customerorder
        ON customerorder.orderid = itemordered.orderid
        WHERE customerorder.orderdatetime > NOW() - ($2::TEXT || ' DAYS')::INTERVAL
		AND NOW() - ($3::TEXT || ' DAYS')::INTERVAL > customerorder.orderdatetime																											   	
		AND restaurantid = $1)),2)
        as ratio from itemordered
        INNER JOIN menuitem
        ON menuitem.menuitemid = itemordered.menuitemid
        INNER JOIN customerorder
        ON customerorder.orderid = itemordered.orderid
        WHERE customerorder.orderdatetime > NOW() - ($2::TEXT || ' DAYS')::INTERVAL
		AND NOW() - ($3::TEXT || ' DAYS')::INTERVAL > customerorder.orderdatetime
		AND restaurantid = $1
        GROUP BY 1
        ORDER BY totalpurchased DESC;
    END
$$ LANGUAGE plpgsql;