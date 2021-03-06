# Intro to SQL Exercises

### Part 1 - CRUD Exercises

Write the SQL commands necessary to do the following:

1.  Create a database called `first_assignment`.
    ```
        createdb first_assignment
    ```
2.  Connect to that database.
    ```
        \c first_assignment
    ```
3.  Create a table called `products` with columns for:

    - `id`, which should be a unique auto-incremementing integer
    - `name`, which should be text, and not nullable
    - `price`, which should be numeric, and greater than zero
    - `can_be_returned`, which should be a boolean, and not nullable

    ```
        CREATE TABLE products (id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    price NUMERIC CHECK (price > 0),
                    can_be_returned BOOLEAN NOT NULL);
    ```

4.  Add a product to the table with the name of "chair", price of 44.00, and can_be_returned of false.

    ```
        INSERT INTO products(name, price, can_be_returned) VALUES ('chair', 44.00, FALSE);
    ```

5.  Add a product to the table with the name of "stool", price of 25.99, and can_be_returned of true.

    ```
        INSERT INTO products(name, price, can_be_returned) VALUES ('stool', 25.99, TRUE);
    ```

6.  Add a product to the table with the name of "table", price of 124.00, and can_be_returned of false.

    ```
        INSERT INTO products(name, price, can_be_returned) VALUES ('table', 124.00, FALSE);
    ```

7.  Display all of the rows and columns in the table.

    ```
        SELECT * FROM products;
    ```

8.  Display all of the names of the products.

    ```
        SELECT name FROM products;
    ```

9.  Display all of the names and prices of the products.

    ```
        SELECT name, price FROM products;
    ```

10. Add a new product - make up whatever you would like!

    ```
        INSERT INTO products(name, price, can_be_returned) VALUES ('hammock', 79.99, TRUE);
    ```

11. Display only the products that `can_be_returned`.

    ```
        SELECT * FROM products WHERE can_be_returned;
    ```

12. Display only the products that have a price less than 44.00.

    ```
        SELECT * FROM products WHERE price < 44.00;
    ```

13. Display only the products that have a price in between 22.50 and 99.99.

    ```
        SELECT * FROM products WHERE price BETWEEN 22.50 AND 99.99;
    ```

14. There's been a change in company policy, and now all tables are returnable. Update the database accordingly.

    ```
        UPDATE products SET can_be_returned = TRUE WHERE name = 'table';
    ```

15. There's a sale going on: Everything is $20 off! Update the database accordingly.

    ```
        UPDATE products SET price = price - 20;
    ```

16. Because of the sale, everything that costs less than $25 has sold out. Remove all products whose price meets this criteria.

    ```
        DELETE FROM products WHERE price < 25;
    ```

17. And now the sale is over. For the remaining products, increase their price by $20.
    ```
        UPDATE products SET price = price + 20;
    ```

### Part 2 - Operators and Aggregates

Let's start with the following sql file called `data.sql`

```sql
DROP DATABASE IF EXISTS  aggregates_exercise;

CREATE DATABASE aggregates_exercise;

\c aggregates_exercise

CREATE TABLE snacks (
  id SERIAL PRIMARY KEY,
  name TEXT,
  kind TEXT,
  calories INTEGER,
  price NUMERIC
);

INSERT INTO snacks
  (name, kind, calories, price)
VALUES
  ('snickers', 'candy bar', 300, 2.99),
  ('cupcakes', 'baked goods', 260, 2.49),
  ('cake', 'baked goods', 400, 3.99),
  ('potato chips', 'chips', 500, 4.99),
  ('milky way', 'candy bar', 220, 7.99),
  ('cheetos', 'chips', 250, 11.99),
  ('chocolate chip cookie', 'baked goods', 290, 2.89),
  ('3 musketeers', 'candy bar', 230, 1.99),
  ('cheese its', 'chips', 100, 0.99),
  ('funions', 'chips', 280, 2.39),
  ('fig newtons', 'baked goods', 240, 3.99),
  ('fruit roolup', 'fruit snack', 420, 5.39),
  ('gushers', 'fruit snack', 220, 3.38),
  ('gogurt', 'yogurt', 260, 5.32),
  ('capri sun', 'beverage', 300, 1.49),
  ('sunny D', 'beverage', 120, 3.99),
  ('ice cream', 'frozen', 2000, 5.29),
  ('rice krispies', 'baked goods', 300, 1.99),
  ('pringles', 'chips', 400, 2.39),
  ('twix', 'candy bar', 450, 2.90),
  ('payday', 'candy bar', 500, 2.39);
```

```sh
psql < data.sql
psql aggregates_exercise
```

Write the following queries to perform the following:

1.  Find the names of the top five most caloric snacks.

    ```
        SELECT name FROM snacks ORDER BY calories DESC LIMIT 5;
    ```

2.  Find the names of the 3 cheapest snacks.

    ```
        SELECT name FROM snacks ORDER BY price LIMIT 3;
    ```

3.  Calculate the total calories for all the snacks. Call this column `total_calories`.

    ```
        SELECT SUM(calories) AS total_calories FROM snacks;
    ```

4.  Calculate the average price for all the snacks. Call this column `average_price`.

    ```
        SELECT AVG(price) as average_price FROM snacks;
    ```

5.  Calculate the lowest price for all the snacks. Call this column `lowest_price`.

    ```
        SELECT MIN(price) as lowest_price FROM snacks;
    ```

6.  Calculate the highest price for all the snacks. Call this column `highest_price`.

    ```
        SELECT MAX(price) as highest_price FROM snacks;
    ```

7.  Find the count for each kind of candy in the table. Your output should look like this:

    ```sql
    /*
        kind     | count
    -------------+-------
    frozen      |     1
    chips       |     5
    baked goods |     5
    yogurt      |     1
    beverage    |     2
    candy bar   |     5
    fruit snack |     2
    */
    ```

    ```sql
        SELECT kind, COUNT(*) FROM snacks GROUP BY kind;
    ```

8)  Find the count of each kind of candy where the count is greater than one. Your output should look like this:

    ```sql
    /*
        kind     | count
    -------------+-------
    chips       |     5
    baked goods |     5
    beverage    |     2
    candy bar   |     5
    fruit snack |     2
    */
    ```

    ```sql
    SELECT kind, COUNT() FROM snacks GROUP BY kind HAVING COUNT(*) > 1;
    ```

9.  Find the average number of calories for each kind of candy and call the name of your column that contains the average `average_calories`. Order your output by the kind of candy in ascending order. Your output should look like this.

    ```sql
    /*
        kind     | average_calories
    -------------+------------------
    baked goods |              298
    beverage    |              210
    candy bar   |              340
    chips       |              306
    frozen      |             2000
    fruit snack |              320
    yogurt      |              260
    */
    ```

    ```sql
        SELECT kind, ROUND(AVG(calories))
            AS average_calories
            FROM snacks
            GROUP BY kind
            ORDER BY kind;
    ```

### Part 3 - Codewars

Complete the following Codewars problems:

[SQL Basics: Simple WHERE and ORDER BY](https://www.codewars.com/kata/sql-basics-simple-where-and-order-by/train/sql)

```
    For this challenge you need to create a simple SELECT statement that will return all columns from the people table WHERE their age is over 50

    people table schema
    id
    name
    age
    You should return all people fields where their age is over 50 and order by the age descending

    NOTE: Your solution should use pure SQL. Ruby is used within the test cases to do the actual testing.
    NOTE 2: Don't end your query with a semicolon.
```

```sql
    SELECT * FROM people WHERE age > 50 ORDER BY age desc
```

[SQL Basics: Simple SUM](https://www.codewars.com/kata/sql-basics-simple-sum)

```
    For this challenge you need to create a simple SUM statement that will sum all the ages.

    people table schema
    id
    name
    age
    select table schema
    age_sum (sum of ages)
    NOTE: Your solution should use pure SQL. Ruby is used within the test cases to do the actual testing.
```

```sql
    SELECT SUM(age) AS age_sum FROM people;
```

[SQL Basics: Simple MIN / MAX](https://www.codewars.com/kata/sql-basics-simple-min-slash-max/train/sql)

```
    For this challenge you need to create a simple MIN / MAX statement that will return the Minimum and Maximum ages out of all the people.

    people table schema
    id
    name
    age
    select table schema
    age_min (minimum of ages)
    age_max (maximum of ages)
    NOTE: Your solution should use pure SQL. Ruby is used within the test cases to do the actual testing.
```

```sql
    SELECT MIN(age) AS age_min,
           MAX(age) AS age_max
           FROM people;
```

[Find all active students](https://www.codewars.com/kata/1-find-all-active-students/train/sql)

```
    Create a simple SELECT query to display student information of all ACTIVE students.
```

```sql
    SELECT * FROM students WHERE IsActive;
```

[SQL Basics: Simple GROUP BY](https://www.codewars.com/kata/sql-basics-simple-group-by/train/sql)

```
    For this challenge you need to create a simple GROUP BY statement, you want to group all the people by their age and count the people who have the same age.

    people table schema
    id
    name
    age
    select table schema
    age [group by]
    people_count (people count)
    NOTE: Your solution should use pure SQL. Ruby is used within the test cases to do the actual testing.
```

```sql
    SELECT age, COUNT(age)
        AS people_count
        FROM people
        GROUP BY age;
```

[SQL Basics: Simple HAVING](https://www.codewars.com/kata/sql-basics-simple-having/train/sql)

```
    For this challenge you need to create a simple HAVING statement, you want to count how many people have the same age and return the groups with 10 or more people who have that age.

    people table schema
    id
    name
    age
    return table schema
    age
    total_people
    NOTE: Your solution should use pure SQL. Ruby is used within the test cases to do the actual testing.
```

```sql
    SELECT age, COUNT(age)
        AS total_people
        FROM people
        GROUP BY age
        HAVING COUNT(age) >= 10;
```
