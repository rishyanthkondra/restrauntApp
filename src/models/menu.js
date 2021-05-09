const pool= require('../utils/database');
module.exports = class Menu{
    constructor( dish_id){
        this.dish_id = dish_id;
    }
    static get_dishes(){
        return pool.query('SELECT dish_id as id,dish_name as name,image_url as image,cost_per_unit as price,dish_description as description, CAST(avg(coalesce(rating,0)) AS DECIMAL(3,2)) as rating FROM dish LEFT OUTER JOIN rates on dish.dish_id = rates.dish_dish_id group by dish.dish_id order by dish.dish_id;');
        // return pool.query('SELECT dish_name as name,image_url as image,cost_per_unit as price,dish_description as description FROM dish');
        //insert into rates(customer_customer_id,dish_dish_id,rating,review) values (1,1,4,'amazing dish!!');
        //SELECT dish_name as name,image_url as image,cost_per_unit as price,dish_description as description, avg(coalesce(rating, 0)) as ratings FROM dish LEFT OUTER JOIN rates on dish.dish_id = rates.dish_dish_id group by dish_id
    }

    static get_cartdish(dish_id,user_id){
        return pool.query('SELECT dish_id as id, dish_name as name,image_url as image,cost_per_unit as price,dish_description as description,coalesce(quantity,0) as quantity FROM dish INNER JOIN cart on dish.dish_id = cart.dish_dish_id where cart.dish_dish_id = '+dish_id+' and cart.customer_customer_id = '+user_id+' ;');
        //image description cost name quantity
    }

    static get_dish(dish_id){
        return pool.query('SELECT dish_id as id, dish_name as name,image_url as image,cost_per_unit as price,dish_description as description, 0 as quantity FROM dish where dish_id = '+dish_id+' ;');
        //image description cost name quantity
    }

    static get_item(dish_id){
        return pool.query('SELECT * FROM dish where dish_id='+ dish_id);
    }

    static getlatest(){
        return pool.query('SELECT dish_id FROM dish order by dish_id DESC LIMIT 1');
    }

    updatedish(price){
        return pool.query('UPDATE dish SET cost_per_unit = $2 where dish_id = $1;',[this.dish_id,price]);
    }

    deletedish(){
        return pool.query('DELETE FROM dish where dish_id='+ this.dish_id + ';');
    }
};