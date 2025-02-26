-- SQLBook: Code
create table users (
    id int primary key auto_increment,
    name varchar(255) not null,
    email varchar(255) not null,
    phone varchar(12) not null,
    password varchar(255) not null,
    created_at timestamp default current_timestamp,
    status int default 1,
    role int default 1
);
create table addresses (
    id int primary key auto_increment,
    idUser int not null,
    name varchar(255) not null,
    phone varchar(12) not null,
    address varchar(255) not null
);
create table products (
    id int primary key auto_increment,
    name varchar(255) not null,
    currentPrice int not null,
    description text,
    image varchar(255) not null,
    sold int default 0,
    isExit boolean default true,
    isBussiness boolean default true,
    idCategory int not null,
    created_at timestamp default current_timestamp
);
create table categories (
    id int primary key auto_increment,
    name varchar(255) not null
);
create table priceHistory (
    id int primary key auto_increment,
    idProduct int not null,
    oldPrice int not null,
    newPrice int not null,
    created_at timestamp default current_timestamp
);
create table itemAddMore (
    idProduct int not null,
    idProductAdd int not null
);
create table orders (
    id int primary key auto_increment,
    idUser int not null,
    name varchar(255) not null,
    phone varchar(12) not null,
    address varchar(255) not null,
    note text,
    total int not null,
    status int default 1,
    created_at timestamp default current_timestamp
);
create table orderDetail (
    id int primary key auto_increment,
    idOrder int not null,
    idProduct int not null,
    quantity int not null,
    price int not null,
    created_at timestamp default current_timestamp
);
create table carts(
    id int primary key auto_increment,
    idUser int not null,
    idProduct int not null,
    quantity int not null,
    created_at timestamp default current_timestamp
);
create table banners (
    id int primary key auto_increment,
    image varchar(255) not null,
    link varchar(255) not null
);
create table feedbacks (
    id int primary key auto_increment,
    name varchar(255) not null,
    email varchar(255) not null,
    title varchar(255) not null,
    content text,
    created_at timestamp default current_timestamp
);
create table shopInfo(
    name varchar(255) not null,
    phone varchar(12) not null,
    taxCode varchar(50) not null,
    email varchar(255) not null,
    address varchar(255) not null,
    activeTime varchar(255) not null
);

alter table addresses
    add constraint fk_addresses_users foreign key (idUser) references users(id);

alter table products
    add constraint fk_products_categories foreign key (idCategory) references categories(id);

alter table priceHistory
    add constraint fk_priceHistory_products foreign key (idProduct) references products(id);

alter table itemAddMore
    add constraint fk_itemAddMore_product foreign key (idProduct) references products(id),
    add constraint fk_itemAddMore_productAdd foreign key (idProductAdd) references products(id);

alter table orders
    add constraint fk_orders_users foreign key (idUser) references users(id);

alter table orderDetail
    add constraint fk_orderDetail_orders foreign key (idOrder) references orders(id),
    add constraint fk_orderDetail_products foreign key (idProduct) references products(id);

alter table carts
    add constraint fk_carts_users foreign key (idUser) references users(id),
    add constraint fk_carts_products foreign key (idProduct) references products(id);
