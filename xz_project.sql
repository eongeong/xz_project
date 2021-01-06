-- 设置客户端连接的编码
SET NAMES UTF8;
-- 丢弃数据库,如果存在
DROP DATABASE IF EXISTS xz_project;
-- 创建数据库,设置编码为utf8
CREATE DATABASE xz_project CHARSET=UTF8;
-- 进入数据库
USE xz_project;
-- 创建数据表xz_laptop
CREATE TABLE xz_laptop(
	lid INT PRIMARY KEY AUTO_INCREMENT,
	laptop_family VARCHAR(32),
	title VARCHAR(128),
	subtitle VARCHAR(128),
	price DECIMAL(10,2),
	promise VARCHAR(64),
	spec VARCHAR(64),
	lname VARCHAR(32),
	os VARCHAR(32),
	memory VARCHAR(32),
	resolution VARCHAR(32),
	video_card VARCHAR(32),
	cpu VARCHAR(32),
	video_memory VARCHAR(32),
	category VARCHAR(32),
	disk VARCHAR(32),
	details VARCHAR(1024),
	shelf_time BIGINT,
	sold_count INT,
	is_onsale BOOL
);

CREATE TABLE xz_laptop_pic(
	laptop_id INT,
	sm VARCHAR(128),
	md VARCHAR(128),
	lg VARCHAR(128),
	FOREIGN KEY(laptop_id) REFERENCES xz_laptop(lid)
);

 CREATE TABLE xz_index_carousel(
	 cid INT PRIMARY KEY AUTO_INCREMENT,
	 laptop_id INT,
	 img VARCHAR(128),
	 FOREIGN KEY(laptop_id) REFERENCES xz_laptop(lid)
 );

 CREATE TABLE xz_index_product(
	 seq_recommended INT,
	 laptop_id INT,
	 title VARCHAR(64),
	 details VARCHAR(128),
	 pic VARCHAR(128),
	 FOREIGN KEY(laptop_id) REFERENCES xz_laptop(lid)
 );

CREATE TABLE xz_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(32) UNIQUE,
	upwd VARCHAR(32),
	email VARCHAR(64),
	phone VARCHAR(16),
	avatar VARCHAR(128) DEFAULT "img/avatar/default.png",
	user_name VARCHAR(32),
	gender BOOL
);

CREATE TABLE xz_receiver_address(
	aid INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	receiver VARCHAR(16),
	province VARCHAR(16),
	city VARCHAR(16),
	county VARCHAR(16),
	address VARCHAR(128),
	cellphone VARCHAR(16),
	fixedphone VARCHAR(16),
	postcode CHAR(6),
	tag VARCHAR(16),
	is_default BOOL,
	FOREIGN KEY(user_id) REFERENCES xz_user(uid)
);

CREATE TABLE xz_order(
	oid INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	address_id INT,
	status INT,
	order_time BIGINT,
	pay_time BIGINT,
	deliver_time BIGINT,
	received_time BIGINT,
	FOREIGN KEY(address_id) REFERENCES xz_receiver_address(aid),
	FOREIGN KEY(user_id) REFERENCES xz_user(uid)
);

CREATE TABLE xz_order_detail(
	did INT PRIMARY KEY AUTO_INCREMENT,
	order_id INT,
	laptop_id INT,
	count INT,
	FOREIGN KEY(order_id) REFERENCES xz_order(oid),
	FOREIGN KEY(laptop_id) REFERENCES xz_laptop(lid)
);

CREATE TABLE xz_shoppingcart_item(
	user_id INT,
	laptop_id INT PRIMARY KEY,
	count INT,
	is_checked BOOL,
	FOREIGN KEY(user_id) REFERENCES xz_user(uid),
	FOREIGN KEY(laptop_id) REFERENCES xz_laptop(lid)
);

CREATE TABLE xz_collect(
	user_id INT,
	laptop_id INT PRIMARY KEY,
	count INT,
	FOREIGN KEY(user_id) REFERENCES xz_user(uid),
	FOREIGN KEY(laptop_id) REFERENCES xz_laptop(lid)
);

INSERT INTO xz_laptop VALUES(NULL,"AppleMacBookAir","Apple MacBook Air 13.3英寸笔记本 银色(Core i5 处理器/8GB内存/128GB SSD闪存 MMGF2CH/A)","5月焕新季，领券买新机！神券满6000减600！一体成型金属机身，纤薄轻巧，长达12小时续航",6988.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","双核i5/8GB内存/128GB闪存","AppleMacBook Air","MacOS","8G","1920*1080","集成显卡","Intel i5低功耗版","其它","轻薄本","128G固态",'["img/product/detail/57b15612N81dc489d.jpg"]',NULL,2968,1);
INSERT INTO xz_laptop VALUES(NULL,"AppleMacBookAir","Apple MacBook Air 13.3英寸笔记本 银色(Core i5 处理器/8GB内存/256GB SSD闪存 MMGF2CH/A)","5月焕新季，领券买新机！神券满6000减600！一体成型金属机身，纤薄轻巧，长达12小时续航",8268.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","双核i5/8GB内存/256GB闪存","AppleMacBook Air","MacOS","8G","1920*1080","集成显卡","Intel i5低功耗版","其它","轻薄本","256G固态",'["img/product/detail/57b15612N81dc489d.jpg"]',NULL,1922,0);
INSERT INTO xz_laptop VALUES(NULL,"AppleMacBookAir","Apple MacBook Air 13.3英寸笔记本电脑 银色(Core i7 处理器/8GB内存/128GB SSD闪存 Z0TA0002L)","i7处理器在此！依旧纤薄轻盈，续航持久，能胜任更多高强度工作，办公利器！",7488.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","定制款：双核i7/8G内存/128G闪存","AppleMacBook Air","MacOS","8G","1920*1080","集成显卡","Intel i7低功耗版","其它","轻薄本","128G固态",'["img/product/detail/57b15612N81dc489d.jpg"]',NULL,733,0);
INSERT INTO xz_laptop VALUES(NULL,"AppleMacBookAir","Apple MacBook Air 13.3英寸笔记本电脑 银色(Core i7 处理器/8GB内存/256GB SSD闪存 Z0TA0002L)","i7处理器在此！依旧纤薄轻盈，续航持久，能胜任更多高强度工作，办公利器！",7888.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","定制款：双核i7/8G内存/128G闪存","AppleMacBook Air","MacOS","8G","1920*1080","集成显卡","Intel i7低功耗版","其它","轻薄本","256G固态",'["img/product/detail/57b15612N81dc489d.jpg"]',NULL,105,0);
INSERT INTO xz_laptop VALUES(NULL,"小米Air","小米(MI)Air 13.3英寸全金属超轻薄笔记本(i5-6200U 8G 256G PCIE固态 940MX独显 FHD WIN10)银","【i5 独立显卡】全高清窄边框 8G内存 256G固态硬盘 支持SSD硬盘扩容 薄至14.8mm 轻至1.28kg！AKG扬声器！",4999.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","【13.3英寸】I5-6200U 8G 256G","小米Air","Windows 10","8G","全高清屏(1920*1080)","入门级游戏独立显卡","Intel i5低功耗版","1G","轻薄本","256G固态",'["img/product/detail/5886e317Nbc52a580.jpg","img/product/detail/586f747eNfdc5f737.jpg","img/product/detail/586f7483N695168a2.jpg","img/product/detail/586f7486Nf809b915.jpg","img/product/detail/586f748bN28dbcbb2.jpg","img/product/detail/586f748fNd2861229.jpg","img/product/detail/586f7493N5a3758af.jpg","img/product/detail/586f7497N20aac53e.jpg"]',NULL,1527,1);
INSERT INTO xz_laptop VALUES(NULL,"小米Air","小米(MI)Air 12.5英寸全金属超轻薄笔记本(Core M-7Y30 4G 128G固态硬盘 全高清屏 背光键盘 Win10)银","【FHD窄边框】第七代处理器 128G SSD支持M.2接口SSD硬盘扩容 薄至12.9mm 轻至1.07kg！AKG扬声器！",3599.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","【12.5银色】 M-7Y30 4G 128G","小米Air","Windows 10","4G","全高清屏(1920*1080)","集成显卡","Intel CoreM","其它","轻薄本","128G固态",'["img/product/detail/5886e317Nbc52a580.jpg","img/product/detail/586f747eNfdc5f737.jpg","img/product/detail/586f7483N695168a2.jpg","img/product/detail/586f7486Nf809b915.jpg","img/product/detail/586f748bN28dbcbb2.jpg","img/product/detail/586f748fNd2861229.jpg","img/product/detail/586f7493N5a3758af.jpg","img/product/detail/586f7497N20aac53e.jpg"]',NULL,115,1);
INSERT INTO xz_laptop VALUES(NULL,"小米Air","小米(MI)Air 12.5英寸全金属超轻薄笔记本(Core M-7Y30 4G 128G固态硬盘 全高清屏 背光键盘 Win10)金","【FHD窄边框】第七代处理器 128G SSD支持M.2接口SSD硬盘扩容 薄至12.9mm 轻至1.07kg！AKG扬声器！",3599.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","【12.5金色】 M-7Y30 4G 128G","小米Air","Windows 10","4G","全高清屏(1920*1080)","集成显卡","Intel CoreM","其它","轻薄本","128G固态",'["img/product/detail/5886e317Nbc52a580.jpg","img/product/detail/586f747eNfdc5f737.jpg","img/product/detail/586f7483N695168a2.jpg","img/product/detail/586f7486Nf809b915.jpg","img/product/detail/586f748bN28dbcbb2.jpg","img/product/detail/586f748fNd2861229.jpg","img/product/detail/586f7493N5a3758af.jpg","img/product/detail/586f7497N20aac53e.jpg"]',NULL,812,0);
INSERT INTO xz_laptop VALUES(NULL,"小米Air","小米(MI)Air 12.5英寸全金属超轻薄笔记本(Core M-6Y30 4G 128G SSD固态硬盘 全高清屏 WIN10) 银","【FHD窄边框】库存紧张 128G固态硬盘 支持M.2接口SSD硬盘扩容 薄至12.9mm 轻至1.07kg！",3499.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","【12.5英寸】M-6Y30 4G 128G","小米Air","Windows 10","4G","全高清屏(1920*1080)","集成显卡","Intel CoreM","其它","轻薄本","128G固态",'["img/product/detail/5886e317Nbc52a580.jpg","img/product/detail/586f747eNfdc5f737.jpg","img/product/detail/586f7483N695168a2.jpg","img/product/detail/586f7486Nf809b915.jpg","img/product/detail/586f748bN28dbcbb2.jpg","img/product/detail/586f748fNd2861229.jpg","img/product/detail/586f7493N5a3758af.jpg","img/product/detail/586f7497N20aac53e.jpg"]',NULL,1081,0);
INSERT INTO xz_laptop VALUES(NULL,"ThinkPadE480C","联想(ThinkPad)轻薄系列E480c(20H3A00GCD)14英寸笔记本(i3-6006U 4G 500G 2G独显 Win10)黑色"," 2017年经典款新！精致小黑！22.3mm轻薄体验，180度开合灵活耐用，高效稳健办公最长可达5小时！",3499.00,"*退货补运费 *30天无忧退货 *48小时快速退款","【E480C-2017新】i3 4G 500G独显"," ThinkPadE480c","Windows 10","4G","标准屏(1366×768)","入门级游戏独立显卡","Intel i3","2G","常规笔记本","500G",'["img/product/detail/58745160N7de01df6.jpg"]',NULL,1461,1);
INSERT INTO xz_laptop VALUES(NULL,"ThinkPadE480C","联想(ThinkPad)轻薄系列E480c(20H3A00GCD)14英寸笔记本(i5-6200U 4G 500G 2G独显 Win10)黑色"," 2017年经典款新！精致小黑！22.3mm轻薄体验，180度开合灵活耐用，高效稳健办公最长可达5小时！",4499.00,"*退货补运费 *30天无忧退货 *48小时快速退款","【E480C-2017新】i5 4G 500G"," ThinkPadE480c","Windows 10","4G","标准屏(1366×768)","入门级游戏独立显卡"," Intel i5低功耗版","2G","常规笔记本","500G",'["img/product/detail/58745160N7de01df6.jpg"]',NULL,733,0);
INSERT INTO xz_laptop VALUES(NULL,"ThinkPadE480C","联想(ThinkPad)轻薄系列E480c(20H3A002CD)14英寸笔记本(i5-6200U 4G 256G SSD 2G独显 Win10)黑色"," 2017年经典款新！精致小黑！22.3mm轻薄体验，180度开合灵活耐用，高效稳健办公最长可达5小时！",5399.00,"*退货补运费 *30天无忧退货 *48小时快速退款","【E480C-2017新】i5 4G 256GSSD"," ThinkPadE480c","Windows 10","4G","标准屏(1366×768)","入门级游戏独立显卡"," Intel i5低功耗版","2G","常规笔记本","256G固态",'["img/product/detail/58745160N7de01df6.jpg"]',NULL,913,1);
INSERT INTO xz_laptop VALUES(NULL,"ThinkPadE480C","联想(ThinkPad)轻薄系列E480c(20H3A001CD)14英寸笔记本电脑(i5-6200U 8G 256G SSD 2G独显 Win10)黑色"," 2017年经典款新！精致小黑！22.3mm轻薄体验，180度开合灵活耐用，高效稳健办公最长可达5小时！",5999.00,"*退货补运费 *30天无忧退货 *48小时快速退款","【E480C-2017新】i5 8G 256GSSD"," ThinkPadE480c","Windows 10","8G","标准屏(1366×768)","入门级游戏独立显卡","Intel i5低功耗版","2G","常规笔记本","256G固态",'["img/product/detail/58745160N7de01df6.jpg"]',NULL,112,0);
INSERT INTO xz_laptop VALUES(NULL,"华硕RX310UQ","华硕(ASUS)13.3英寸RX310UQ金属超极本 学生 商务手提轻薄便携超薄笔记本电脑 玫瑰金 13.3英寸I3-7100U/4G/128G固态","【铝镁合金 纯固态 轻至1.45kg 金属超极本 】双尺寸可选",4299.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","13.3英寸I3-7100U/4G/128G固态","华硕(ASUS)13.3英寸RX310UQ金属超极本 学生 商务","Windows 10","8G","全高清屏(1920×1080)","高性能游戏独立显卡","Intel i5低功耗版","2G","轻薄本","128G固态",'["img/product/detail/59190fe7N6a9fb112.jpg","img/product/detail/58d0bfceNc0694135.jpg","img/product/detail/59143b58N0f24f48d.jpg","img/product/detail/58f9de03Nd67611dc.jpg","img/product/detail/58d0bfcbNc96d061c.jpg","img/product/detail/58d0bfd1Nea212a7a.jpg"]',NULL,1197,1);
INSERT INTO xz_laptop VALUES(NULL,"华硕RX310UQ","华硕(ASUS)13.3英寸RX310UQ金属超极本 学生 商务手提轻薄便携超薄笔记本电脑 玫瑰金 13.3英寸I5/4G/128G固态","【铝镁合金 纯固态 轻至1.45kg 金属超极本 】双尺寸可选",4999.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","13.3英寸I5/4G/128G固态","华硕(ASUS)13.3英寸RX310UQ金属超极本 学生 商务","Windows 10","8G","全高清屏(1920×1080)","高性能游戏独立显卡","Intel i5低功耗版","2G","轻薄本","128G固态",'["img/product/detail/59190fe7N6a9fb112.jpg","img/product/detail/58d0bfceNc0694135.jpg","img/product/detail/59143b58N0f24f48d.jpg","img/product/detail/58f9de03Nd67611dc.jpg","img/product/detail/58d0bfcbNc96d061c.jpg","img/product/detail/58d0bfd1Nea212a7a.jpg"]',NULL,137,0);
INSERT INTO xz_laptop VALUES(NULL,"华硕RX310UQ","华硕(ASUS)13.3英寸RX310UQ金属超极本 学生 商务手提轻薄便携超薄笔记本电脑 玫瑰金 13.3英寸I5/4G/256G/2G独显","【铝镁合金 纯固态 轻至1.45kg 金属超极本 】双尺寸可选",5499.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","13.3英寸I5/4G/256G/2G独显","华硕(ASUS)13.3英寸RX310UQ金属超极本 学生 商务","Windows 10","4G","全高清屏(1920×1080)","高性能游戏独立显卡","Intel i5低功耗版","2G","轻薄本","128G固态",'["img/product/detail/59190fe7N6a9fb112.jpg","img/product/detail/58d0bfceNc0694135.jpg","img/product/detail/59143b58N0f24f48d.jpg","img/product/detail/58f9de03Nd67611dc.jpg","img/product/detail/58d0bfcbNc96d061c.jpg","img/product/detail/58d0bfd1Nea212a7a.jpg"]',NULL,21,0);
INSERT INTO xz_laptop VALUES(NULL,"华硕RX310UQ","华硕(ASUS)13.3英寸RX310UQ金属超极本 学生 商务手提轻薄便携超薄笔记本电脑 玫瑰金 13.3英寸I5/8G/256G/2G独显","【铝镁合金 纯固态 轻至1.45kg 金属超极本 】双尺寸可选",5699.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","13.3英寸I5/8G/256G/2G独显","华硕(ASUS)13.3英寸RX310UQ金属超极本 学生 商务","Windows 10","8G","全高清屏(1920×1080)","高性能游戏独立显卡","Intel i5低功耗版","2G","轻薄本","128G固态",'["img/product/detail/59190fe7N6a9fb112.jpg","img/product/detail/58d0bfceNc0694135.jpg","img/product/detail/59143b58N0f24f48d.jpg","img/product/detail/58f9de03Nd67611dc.jpg","img/product/detail/58d0bfcbNc96d061c.jpg","img/product/detail/58d0bfd1Nea212a7a.jpg"]',NULL,981,0);
INSERT INTO xz_laptop VALUES(NULL,"联想小新700","联想(Lenovo)小新700电竞版 15.6英寸游戏笔记本电脑(i5-6300HQ 8G 500G+128G SSD GTX950M 4G IPS)黑","【小新家族2017闪耀换新！晒单得E卡！12期免息！】小新700电竞版！经典之选",5199.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","小新700【i5 双硬盘 GTX950M】","联想小新700","Windows 10","8G","分辨率：全高清屏(1920×1080)","GTX950M","Intel i5标准电压版","4G","游戏本","128G+500G",'["img/product/detail/59190fe7N6a9fb112.jpg","img/product/detail/58d0bfceNc0694135.jpg","img/product/detail/59143b58N0f24f48d.jpg","img/product/detail/58f9de03Nd67611dc.jpg","img/product/detail/58d0bfcbNc96d061c.jpg","img/product/detail/58d0bfd1Nea212a7a.jpg"]',NULL,192,1);
INSERT INTO xz_laptop VALUES(NULL,"联想小新700","联想(Lenovo)小新700电竞版 15.6英寸游戏笔记本电脑(i7-6700HQ 8G 500G GTX950M 4G FHD IPS Office)黑","【小新家族2017闪耀换新！晒单得E卡！12期免息！】小新700电竞版！经典之选",5499.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","小新700【i7 8G 500G GTX950M】","联想小新700","Windows 10","8G","分辨率：全高清屏(1920×1080)","GTX950M","Intel i7标准电压版","4G","游戏本","128G+500G",'["img/product/detail/58ca2b14Nd5c09fcd.jpg","img/product/detail/58ca2b28Na5a22f83.jpg","img/product/detail/58ca3012Nc99ab61f.jpg","img/product/detail/58ca2b51Nbf258c3b.jpg","img/product/detail/58ca2b67N436e60de.jpg"]',NULL,260,0);
INSERT INTO xz_laptop VALUES(NULL,"戴尔燃7000","戴尔DELL灵越燃7000 R1525S 14.0英寸轻薄窄边框笔记本电脑(i5-7200U 4G 128GSSD+500G 940MX 2G独显 FHD)银","【轻薄微边框、燃7000】七代i5双核CPU、128GSSD+500G双硬盘、IPS全高清显示屏，动力强劲性能澎湃！",5299.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","【流光银】i5-7200u 4G 128 500G"," 戴尔燃7000","Windows 10","4G","全高清屏(1920×1080)","入门级游戏独立显卡","Intel i5低功耗版","2G","轻薄本","128G+500G",'["img/product/detail/58d87221Na033954c.jpg","img/product/detail/58e5e4b5N862f8aa1.jpg","img/product/detail/57bfa672N20953b71.jpg"]',NULL,911,0);
INSERT INTO xz_laptop VALUES(NULL,"戴尔燃7000"," 戴尔DELL灵越燃7000 R1725G 14.0英寸轻薄窄边框笔记本电脑(i7-7500U 8G 128GSSD+1T 940MX 2G独显 FHD)金","【轻薄微边框、燃7000】七代i5双核CPU、128GSSD+500G双硬盘、IPS全高清显示屏，动力强劲性能澎湃！",6599.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","【溢彩金】i7-7500u 8G 128 1T"," 戴尔燃7000","Windows 10","8G","全高清屏(1920×1080)","入门级游戏独立显卡","Intel i7低功耗版","2G","轻薄本","128G+500G",'["img/product/detail/58d87221Na033954c.jpg","img/product/detail/58e5e4b5N862f8aa1.jpg","img/product/detail/57bfa672N20953b71.jpg"]',NULL,1930,1);
INSERT INTO xz_laptop VALUES(NULL,"戴尔燃7000","戴尔DELL灵越燃7000 R1525P 14.0英寸轻薄窄边框笔记本电脑(i5-7200U 4G 128GSSD+500G 2G独显 FHD)元気粉","【轻薄微边框、燃7000】七代i5双核CPU、128GSSD+500G双硬盘、IPS全高清显示屏，动力强劲性能澎湃！",5299.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","【元気粉】i5-7200u 4G 128 500G"," 戴尔燃7000","Windows 10","4G","全高清屏(1920×1080)","入门级游戏独立显卡","Intel i5低功耗版","2G","轻薄本","128G+500G",'["img/product/detail/58d87221Na033954c.jpg","img/product/detail/58e5e4b5N862f8aa1.jpg","img/product/detail/57bfa672N20953b71.jpg"]',NULL,987,1);
INSERT INTO xz_laptop VALUES(NULL,"戴尔灵越15PR-5745B", "戴尔DELL灵越游匣15PR-5745B 15.6英寸游戏笔记本电脑(i7-7700HQ 8G 128GSSD+1T GTX1050 4G独显 FHD)黑","【白条6期免息 游匣“10”力出击】七代四核CPU ,GTX1050 4G独显,FHD全高清屏,热血出击！",6999.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","宗师版 i7-7700HQ 8G GTX1050 4G","戴尔灵越游匣15PR-5745B","Windows 10","8G","全高清屏(1920×1080)","GTX960M","Intel i7标准电压版","4G","游戏本","128G+1T",'["img/product/detail/59003d3fNd4e6c74e.jpg","img/product/detail/59003d49Nd9aa8623.jpg","img/product/detail/59003d53N79717f17.jpg","img/product/detail/59003db4N5441df2e.jpg","img/product/detail/59003afdN7d9208b8.jpg"]',NULL,1901,1);
INSERT INTO xz_laptop VALUES(NULL,"戴尔灵越15PR-5745B", "戴尔DELL灵越游匣15PR-5645SE 15.6英寸游戏笔记本电脑(i5-7300HQ 8G 128GSSD+1T GTX1050 4G独显 FHD)枪弹版","游匣枪弹版精装上市 3D立体喷涂画面 机身更酷炫 七代四核CPU ,GTX1050 4G独显,FHD全高清屏,热血出击！",6699.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","枪弹版 i5-7300HQ 8G GTX1050 4G","戴尔灵越游匣15PR-5645SE","Windows 10","8G","全高清屏(1920×1080)","GTX960M","Intel i5标准电压版","4G","游戏本","128G+1T",'["img/product/detail/59003d3fNd4e6c74e.jpg","img/product/detail/59003d49Nd9aa8623.jpg","img/product/detail/59003d53N79717f17.jpg","img/product/detail/59003db4N5441df2e.jpg","img/product/detail/59003afdN7d9208b8.jpg"]',NULL,1231,0);
INSERT INTO xz_laptop VALUES(NULL,"戴尔灵越15PR-5745B", "戴尔DELL灵越游匣15PR-5745SE 15.6英寸游戏笔记本电脑(i7-7700HQ 8G 128GSSD+1T GTX1050 4G独显 FHD)枪弹版","游匣枪弹版精装上市 3D立体喷涂画面 机身更酷炫 七代四核CPU ,GTX1050 4G独显,FHD全高清屏,热血出击！", 7999.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","枪弹版 i7-7700HQ 8G GTX1050 4G","戴尔灵越游匣15PR-5645SE","Windows 10","8G","全高清屏(1920×1080)","GTX960M","Intel i7标准电压版","4G","游戏本","128G+1T",'["img/product/detail/59003d3fNd4e6c74e.jpg","img/product/detail/59003d49Nd9aa8623.jpg","img/product/detail/59003d53N79717f17.jpg","img/product/detail/59003db4N5441df2e.jpg","img/product/detail/59003afdN7d9208b8.jpg"]',NULL,221,0);
INSERT INTO xz_laptop VALUES(NULL,"戴尔灵越15PR-5745B", "戴尔DELL灵越游匣15PR-3848B 15.6英寸游戏笔记本电脑(i7-6700HQ 4G 128GSSD+500G GTX960M 4G FHD)黑","【强力散热保性能】 960M 4G独显 预装128SSD 双硬盘游戏更劲爽 我们比大多数产品 散热好一些",6099.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","精锐版 i7-6700HQ 4G GTX960 4G","戴尔游匣","Windows 10","4G","全高清屏(1920×1080)","GTX960M","Intel i7标准电压版","4G","游戏本","128G+1T",'["img/product/detail/59003d3fNd4e6c74e.jpg","img/product/detail/59003d49Nd9aa8623.jpg","img/product/detail/59003d53N79717f17.jpg","img/product/detail/59003db4N5441df2e.jpg","img/product/detail/59003afdN7d9208b8.jpg"]',NULL,711,1);
INSERT INTO xz_laptop VALUES(NULL,"戴尔灵越15PR-5745B", "戴尔DELL灵越游匣15PR-2648B 15.6英寸游戏笔记本电脑(i5-6300HQ 4G 128SSD+500G GTX960M 4G独显 FHD)黑","【选游戏本还得看散热】960M 4G独显 预装128SSD 双硬盘游戏更劲爽 ！", 5299.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","精锐版 i5-6300HQ 4G GTX960 4G","戴尔游匣","Windows 10","4G","全高清屏(1920×1080)","GTX960M","Intel i5标准电压版","4G","游戏本","128G+1T",'["img/product/detail/59003d3fNd4e6c74e.jpg","img/product/detail/59003d49Nd9aa8623.jpg","img/product/detail/59003d53N79717f17.jpg","img/product/detail/59003db4N5441df2e.jpg","img/product/detail/59003afdN7d9208b8.jpg"]',NULL,319,0);
INSERT INTO xz_laptop VALUES(NULL,"戴尔灵越15PR-5745B", "戴尔DELL灵越游匣15PR-5645B 15.6英寸游戏笔记本电脑(i5-7300HQ 8G 128GSSD+1T GTX1050 4G独显 FHD)黑","【白条6期免息 游匣“10”力出击】七代四核CPU ,GTX1050 4G独显,FHD全高清屏,热血出击！", 5999.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","宗师版 i5-7300HQ 8G GTX1050 4G"," 戴尔灵越游匣15PR-5645B","Windows 10","8G","全高清屏(1920×1080)","GTX960M","Intel i7标准电压版","4G","游戏本","128G+1T",'["img/product/detail/59003d3fNd4e6c74e.jpg","img/product/detail/59003d49Nd9aa8623.jpg","img/product/detail/59003d53N79717f17.jpg","img/product/detail/59003db4N5441df2e.jpg","img/product/detail/59003afdN7d9208b8.jpg"]',NULL,2110,0);
INSERT INTO xz_laptop VALUES(NULL,"ThinkPadE470 C", "联想(ThinkPad)轻薄系列E470c(20H3A000CD)14英寸笔记本电脑(i5-6200U 4G 500G 2G独显 Win10)黑色","点击进入5月大促，超值满千减百品牌周",3998.00,"*30天无忧退货 *48小时快速退款","【E470C-2017新】i5 4G 500G","ThinkPadE470 c","linux","4G","标准屏(1366×768)","入门级游戏独立显卡","Intel i5低功耗版","2G","常规本","500G",'["img/product/detail/58119b8aNb84f1e22.jpg"]',NULL,117,1);
INSERT INTO xz_laptop VALUES(NULL,"ThinkPadE470 C", "联想(ThinkPad)轻薄系列E470c(20H3A004CD)14英寸笔记本电脑(i5-6200U 8G 500G 2G独显 Win10)黑色","点击进入5月大促，超值满千减百品牌周",4699.00,"*30天无忧退货 *48小时快速退款","【E470C-2017新】i5 8G 500G","ThinkPadE470 c","linux","8G","标准屏(1366×768)","入门级游戏独立显卡","Intel i5低功耗版","2G","常规本","500G",'["img/product/detail/58119b8aNb84f1e22.jpg"]',NULL,1862,0);
INSERT INTO xz_laptop VALUES(NULL,"ThinkPadE470 C", "联想(ThinkPad)轻薄系列E470c(20H3A003CD)14英寸笔记本电脑(i5-6200U 8G 1T 2G独显 Win10)黑色","点击进入5月大促，超值满千减百品牌周",5499.00,"*30天无忧退货 *48小时快速退款","【E470C-2017新】i5 8G 1TB","ThinkPadE470 c","linux","8G","标准屏(1366×768)","入门级游戏独立显卡","Intel i5低功耗版","2G","常规本","1T",NULL,'["img/product/detail/58119b8aNb84f1e22.jpg"]',812,1);
INSERT INTO xz_laptop VALUES(NULL,"ThinkPadE470 C", "联想(ThinkPad)轻薄系列E470c(20H3A002CD)14英寸笔记本电脑(i5-6200U 4G 256G SSD 2G独显 Win10)黑色","点击进入5月大促，超值满千减百品牌周", 5399.00,"*30天无忧退货 *48小时快速退款","【E470C-2017新】i5 4G 256GSSD","ThinkPadE470 c","linux","4G","标准屏(1366×768)","入门级游戏独立显卡","Intel i5低功耗版","2G","常规本","256G固态",'["img/product/detail/58119b8aNb84f1e22.jpg"]',NULL,162,0);
INSERT INTO xz_laptop VALUES(NULL,"ThinkPadE470 C", "联想(ThinkPad)轻薄系列E470c(20H3A001CD)14英寸笔记本电脑(i5-6200U 8G 256G SSD 2G独显 Win10)黑色","点击进入5月大促，超值满千减百品牌周",5499.00,"*30天无忧退货 *48小时快速退款","【E470C-2017新】i5 8G 256GSSD","ThinkPadE470 c","linux","8G","标准屏(1366×768)","入门级游戏独立显卡","Intel i5低功耗版","2G","常规本","256G固态",'["img/product/detail/58119b8aNb84f1e22.jpg"]',NULL,1180,0);
INSERT INTO xz_laptop VALUES(NULL,"华硕FH5900V", "华硕(ASUS)顽石电竞版FH5900 15.6英寸游戏笔记本电脑(i7-6700HQ 4G 1TB +128G SSD NV940MX 2G 独显 FHD)","顽石血统 标压电竞版 强劲动力带你畅快遨游",4999.00,"*退货补运费 *30天无忧退货 *72小时发货","【高速】顽石游戏本i74G1T128SSD","华硕FH5900V","Windows 10","4G","全高清屏(1920*1080)","入门级游戏独立显卡","Intel i7标准电压版","2G","游戏本","128G+1T",'["img/product/detail/583d2fb0N44aa29cf.jpg","img/product/detail/583d2fd5N33db758b.jpg","img/product/detail/583d359aN47f3276b.jpg","img/product/detail/583d3036Nef20d28f.jpg","img/product/detail/583d304aN4722f8d5.jpg"]',NULL,1231,0);
INSERT INTO xz_laptop VALUES(NULL,"华硕FH5900V", "华硕(ASUS) 顽石四代尊享版 15.6英寸笔记本电脑(i7-7500U 8G 1TB NV940MX 2G独显 深蓝 FHD )","第七代i7处理器，8G超大内存与1T硬盘，快无止境、大无止境",4699.00,"*退货补运费 *30天无忧退货 *72小时发货"," 顽石经典【高配i7 8G 1T 深蓝】","华硕FL5900UQ","Windows 10","8G","全高清屏(1920*1080)","入门级游戏独立显卡","Intel i7低功耗版","2G","游戏本","1T",'["img/product/detail/583d2fb0N44aa29cf.jpg","img/product/detail/583d2fd5N33db758b.jpg","img/product/detail/583d359aN47f3276b.jpg","img/product/detail/583d3036Nef20d28f.jpg","img/product/detail/583d304aN4722f8d5.jpg"]',NULL,1231,1);
INSERT INTO xz_laptop VALUES(NULL,"华硕FH5900V", "华硕(ASUS) 顽石四代旗舰版FL5900 15.6英寸笔记本电脑(i7-7500U 4G 1TB +128GBSSD NV940MX 深蓝 FHD)","混合硬盘，1T搭载128G固态，读取速度更快，智能散热不烫手！！", 4999.00,"*退货补运费 *30天无忧退货 *72小时发货","顽石双盘【i7 4G 1t加128SSD】","华硕FL5900UQ","Windows 10","4G","全高清屏(1920*1080)","入门级游戏独立显卡","Intel i7低功耗版","2G","游戏本","128G+1T",'["img/product/detail/583d2fb0N44aa29cf.jpg","img/product/detail/583d2fd5N33db758b.jpg","img/product/detail/583d359aN47f3276b.jpg","img/product/detail/583d3036Nef20d28f.jpg","img/product/detail/583d304aN4722f8d5.jpg"]',NULL,221,0);
INSERT INTO xz_laptop VALUES(NULL,"华硕FH5900V", "华硕(ASUS)顽石四代疾速版 FL5900 15.6英寸笔记本电脑(i7-6500U 4G 512GB SSD NV940M 2G独显 红色)","【同样配置看主板，搭配华硕主板让您放心，屏幕无坏点保证】办公，游戏无压力！！！",4799.00,"*退货补运费 *30天无忧退货 *72小时发货","顽石高速【i7-4G 512SSD 炫红】","华硕FL5900U","Windows 10","4G","全高清屏(1920*1080)","GT940M","Intel i7低功耗版","2G","游戏本","512G固态",'["img/product/detail/583d2fb0N44aa29cf.jpg","img/product/detail/583d2fd5N33db758b.jpg","img/product/detail/583d359aN47f3276b.jpg","img/product/detail/583d3036Nef20d28f.jpg","img/product/detail/583d304aN4722f8d5.jpg"]',NULL,103,1);
INSERT INTO xz_laptop VALUES(NULL,"华硕FH5900V", "华硕(ASUS) 顽石四代疾速版FL5900 15.6英寸笔记本电脑(i7-6500U 4G 512G SSD NV940MX 2G独显 红色 FHD)","疾速版，就是要你快！512G固态硬盘，第六代i7处理器搭载2G独显！",4799.00,"*退货补运费 *30天无忧退货 *72小时发货","顽石高速【i74G512SSD NV940MX】","华硕FL5900UQ","Windows 10","4G","全高清屏(1920*1080)","入门级游戏独立显卡","Intel i7低功耗版","2G","游戏本","512G固态",'["img/product/detail/583d2fb0N44aa29cf.jpg","img/product/detail/583d2fd5N33db758b.jpg","img/product/detail/583d359aN47f3276b.jpg","img/product/detail/583d3036Nef20d28f.jpg","img/product/detail/583d304aN4722f8d5.jpg"]',NULL,341,0);
INSERT INTO xz_laptop VALUES(NULL,"神舟战神Z7M-KP7GT","神舟(HASEE)战神Z7M-KP7GT 15.6英寸游戏本笔记本电脑(i7-7700HQ 8G 1T+128G SSD GTX1050Ti 1080P)IPS屏","超强性价比！！",6199.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","Z7M GT【i7 128G+1T GTX1050Ti】","神舟战神Z7M-KP7GT","Windows 10","8G","全高清屏(1920×1080)","GTX1050Ti","Intel i7标准电压版","4G","游戏本","128G+1T",'["img/product/detail/58c67b22Ned66fcb8.jpg","img/product/detail/58c67b23Nfffc2f8b.jpg","img/product/detail/58c67b22N04b18388.jpg","img/product/detail/58c67b24N6d5ce71c.jpg","img/product/detail/58c67b24Nac3dc074.jpg","img/product/detail/58c67b22N8aa1905c.jpg","img/product/detail/58c67b24N9aa8a252.jpg"]',NULL,441,0);
INSERT INTO xz_laptop VALUES(NULL,"神舟战神Z7M-KP7GT","神舟(HASEE)战神Z7M-SL7D2 15.6英寸游戏本笔记本电脑(i7-6700HQ 8G 1T+128GB SSD GTX965M 1080P)IPS","六代i7 SSD GTX965M还预装WIN10，一步到位，你赢了！",5499.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货"," 战神Z7M【四核i7 GTX965M】","神舟战神Z7M","Windows 10","8G","全高清屏(1920×1080)","GTX965M","Intel i7标准电压版","4G","游戏本","128G+1T",'["img/product/detail/58c67b22Ned66fcb8.jpg","img/product/detail/58c67b23Nfffc2f8b.jpg","img/product/detail/58c67b22N04b18388.jpg","img/product/detail/58c67b24N6d5ce71c.jpg","img/product/detail/58c67b24Nac3dc074.jpg","img/product/detail/58c67b22N8aa1905c.jpg","img/product/detail/58c67b24N9aa8a252.jpg"]',NULL,1289,1);
INSERT INTO xz_laptop VALUES(NULL,"神舟战神Z7M-KP7GT","神舟(HASEE)战神Z7M-SL5D1 15.6英寸游戏本笔记本电脑(i5-6300HQ 8G 1TB GTX965M 1080P)IPS屏","超强性价比！！",4499.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","战神Z7M【四核i5 GTX965M】","神舟战神Z7M-SL5D1","Windows 10","8G","全高清屏(1920×1080)","GTX965M","Intel i7标准电压版","2G","游戏本","1T",'["img/product/detail/58c67b22Ned66fcb8.jpg","img/product/detail/58c67b23Nfffc2f8b.jpg","img/product/detail/58c67b22N04b18388.jpg","img/product/detail/58c67b24N6d5ce71c.jpg","img/product/detail/58c67b24Nac3dc074.jpg","img/product/detail/58c67b22N8aa1905c.jpg","img/product/detail/58c67b24N9aa8a252.jpg"]',NULL,231,0);
INSERT INTO xz_laptop VALUES(NULL,"神舟战神Z7M-KP7GT","神舟(HASEE)战神Z6-KP5GT 15.6英寸游戏本笔记本电脑(i5-7300HQ 8G 1T+128G SSD GTX1050 1080P)黑色","超强性价比！！",5199.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货","Z6 GT【i5 128G+1T GTX1050】","神舟战神Z6-KP5GT","Windows 10","8G","全高清屏(1920×1080)","GTX1050","Intel i5标准电压版","4G","游戏本","128G+1T",'["img/product/detail/58c67b22Ned66fcb8.jpg","img/product/detail/58c67b23Nfffc2f8b.jpg","img/product/detail/58c67b22N04b18388.jpg","img/product/detail/58c67b24N6d5ce71c.jpg","img/product/detail/58c67b24Nac3dc074.jpg","img/product/detail/58c67b22N8aa1905c.jpg","img/product/detail/58c67b24N9aa8a252.jpg"]',NULL,469,1);
INSERT INTO xz_laptop VALUES(NULL,"神舟战神Z7M-KP7GT","神舟(HASEE) 战神G6-SL7S2 17.3英寸游戏笔记本(i7-6700HQ 8G 256G SSD GTX960M 2G独显 1080P)黑色","17.3英寸大屏游戏本，纯固态硬盘，秒速开启超神之路！",5499.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货"," 战神G6【17.3英寸 GTX960M】","神舟战神G6","Windows 10","8G","全高清屏(1920×1080)","GTX960M","Intel i7标准电压版","4G","游戏本","256固态",'["img/product/detail/58c67b22Ned66fcb8.jpg","img/product/detail/58c67b23Nfffc2f8b.jpg","img/product/detail/58c67b22N04b18388.jpg","img/product/detail/58c67b24N6d5ce71c.jpg","img/product/detail/58c67b24Nac3dc074.jpg","img/product/detail/58c67b22N8aa1905c.jpg","img/product/detail/58c67b24N9aa8a252.jpg"]',NULL,1223,0);
INSERT INTO xz_laptop VALUES(NULL,"神舟战神Z7M-KP7GT","神舟(HASEE)战神Z6-KP7GT 15.6英寸游戏本笔记本电脑(i7-7700HQ 8G 1T+128G SSD GTX1050 1080P)黑色","预约享5499抢！【128G SSD+1T HDD】双硬盘，春风“十”里，期待是你！",5699.00,"*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货"," Z6 GT【i7 128G+1T GTX1050】","神舟战神Z6-KP7GT","Windows 10","8G","全高清屏(1920×1080)","GTX1050","Intel i7标准电压版","2G","游戏本","128G+1T",'["img/product/detail/58c67b22Ned66fcb8.jpg","img/product/detail/58c67b23Nfffc2f8b.jpg","img/product/detail/58c67b22N04b18388.jpg","img/product/detail/58c67b24N6d5ce71c.jpg","img/product/detail/58c67b24Nac3dc074.jpg","img/product/detail/58c67b22N8aa1905c.jpg","img/product/detail/58c67b24N9aa8a252.jpg"]',NULL,1844,1);

INSERT INTO xz_laptop_pic VALUES( 1,"img/product/sm/57b12a31N8f4f75a3.jpg","img/product/md/57b12a31N8f4f75a3.jpg","img/product/lg/57b12a31N8f4f75a3.jpg ");
INSERT INTO xz_laptop_pic VALUES( 1,"img/product/sm/57ad359dNd4a6f130.jpg","img/product/md/57ad359dNd4a6f130.jpg","img/product/lg/57ad359dNd4a6f130.jpg ");
INSERT INTO xz_laptop_pic VALUES( 1,"img/product/sm/57ad8846N64ac3c79.jpg","img/product/md/57ad8846N64ac3c79.jpg","img/product/lg/57ad8846N64ac3c79.jpg ");
INSERT INTO xz_laptop_pic VALUES( 2,"img/product/sm/57b12a31N8f4f75a3.jpg","img/product/md/57b12a31N8f4f75a3.jpg","img/product/lg/57b12a31N8f4f75a3.jpg ");
INSERT INTO xz_laptop_pic VALUES( 2,"img/product/sm/57ad359dNd4a6f130.jpg","img/product/md/57ad359dNd4a6f130.jpg","img/product/lg/57ad359dNd4a6f130.jpg ");
INSERT INTO xz_laptop_pic VALUES( 2,"img/product/sm/57ad8846N64ac3c79.jpg","img/product/md/57ad8846N64ac3c79.jpg","img/product/lg/57ad8846N64ac3c79.jpg ");
INSERT INTO xz_laptop_pic VALUES( 3,"img/product/sm/57b12a31N8f4f75a3.jpg","img/product/md/57b12a31N8f4f75a3.jpg","img/product/lg/57b12a31N8f4f75a3.jpg ");
INSERT INTO xz_laptop_pic VALUES( 3,"img/product/sm/57ad359dNd4a6f130.jpg","img/product/md/57ad359dNd4a6f130.jpg","img/product/lg/57ad359dNd4a6f130.jpg ");
INSERT INTO xz_laptop_pic VALUES( 3,"img/product/sm/57ad8846N64ac3c79.jpg","img/product/md/57ad8846N64ac3c79.jpg","img/product/lg/57ad8846N64ac3c79.jpg ");
INSERT INTO xz_laptop_pic VALUES( 4,"img/product/sm/57b12a31N8f4f75a3.jpg","img/product/md/57b12a31N8f4f75a3.jpg","img/product/lg/57b12a31N8f4f75a3.jpg ");
INSERT INTO xz_laptop_pic VALUES( 4,"img/product/sm/57ad359dNd4a6f130.jpg","img/product/md/57ad359dNd4a6f130.jpg","img/product/lg/57ad359dNd4a6f130.jpg ");
INSERT INTO xz_laptop_pic VALUES( 4,"img/product/sm/57ad8846N64ac3c79.jpg","img/product/md/57ad8846N64ac3c79.jpg","img/product/lg/57ad8846N64ac3c79.jpg ");
INSERT INTO xz_laptop_pic VALUES( 5,"img/product/sm/57e3b072N661cd00d.jpg","img/product/md/57e3b072N661cd00d.jpg","img/product/lg/57e3b072N661cd00d.jpg ");
INSERT INTO xz_laptop_pic VALUES( 5,"img/product/sm/57e1ff09Nf610fea3.jpg","img/product/md/57e1ff09Nf610fea3.jpg","img/product/lg/57e1ff09Nf610fea3.jpg ");
INSERT INTO xz_laptop_pic VALUES( 5,"img/product/sm/57e1ff17N286390a9.jpg","img/product/md/57e1ff17N286390a9.jpg","img/product/lg/57e1ff17N286390a9.jpg ");
INSERT INTO xz_laptop_pic VALUES( 5,"img/product/sm/57e1ff2fN8a36d0fe.jpg","img/product/md/57e1ff2fN8a36d0fe.jpg","img/product/lg/57e1ff2fN8a36d0fe.jpg ");
INSERT INTO xz_laptop_pic VALUES( 5,"img/product/sm/57e52dffNa4d8ce2c.jpg","img/product/md/57e52dffNa4d8ce2c.jpg","img/product/lg/57e52dffNa4d8ce2c.jpg ");
INSERT INTO xz_laptop_pic VALUES( 5,"img/product/sm/57e52e03N4ec367dd.jpg","img/product/md/57e52e03N4ec367dd.jpg","img/product/lg/57e52e03N4ec367dd.jpg ");
INSERT INTO xz_laptop_pic VALUES( 5,"img/product/sm/57e52e06N116974f7.jpg","img/product/md/57e52e06N116974f7.jpg","img/product/lg/57e52e06N116974f7.jpg ");
INSERT INTO xz_laptop_pic VALUES( 6,"img/product/sm/57e3b072N661cd00d.jpg","img/product/md/57e3b072N661cd00d.jpg","img/product/lg/57e3b072N661cd00d.jpg ");
INSERT INTO xz_laptop_pic VALUES( 6,"img/product/sm/57e1ff09Nf610fea3.jpg","img/product/md/57e1ff09Nf610fea3.jpg","img/product/lg/57e1ff09Nf610fea3.jpg ");
INSERT INTO xz_laptop_pic VALUES( 6,"img/product/sm/57e1ff17N286390a9.jpg","img/product/md/57e1ff17N286390a9.jpg","img/product/lg/57e1ff17N286390a9.jpg ");
INSERT INTO xz_laptop_pic VALUES( 6,"img/product/sm/57e1ff2fN8a36d0fe.jpg","img/product/md/57e1ff2fN8a36d0fe.jpg","img/product/lg/57e1ff2fN8a36d0fe.jpg ");
INSERT INTO xz_laptop_pic VALUES( 6,"img/product/sm/57e52dffNa4d8ce2c.jpg","img/product/md/57e52dffNa4d8ce2c.jpg","img/product/lg/57e52dffNa4d8ce2c.jpg ");
INSERT INTO xz_laptop_pic VALUES( 6,"img/product/sm/57e52e03N4ec367dd.jpg","img/product/md/57e52e03N4ec367dd.jpg","img/product/lg/57e52e03N4ec367dd.jpg ");
INSERT INTO xz_laptop_pic VALUES( 6,"img/product/sm/57e52e06N116974f7.jpg","img/product/md/57e52e06N116974f7.jpg","img/product/lg/57e52e06N116974f7.jpg ");
INSERT INTO xz_laptop_pic VALUES( 7,"img/product/sm/57e3b072N661cd00d.jpg","img/product/md/57e3b072N661cd00d.jpg","img/product/lg/57e3b072N661cd00d.jpg ");
INSERT INTO xz_laptop_pic VALUES( 7,"img/product/sm/57e1ff09Nf610fea3.jpg","img/product/md/57e1ff09Nf610fea3.jpg","img/product/lg/57e1ff09Nf610fea3.jpg ");
INSERT INTO xz_laptop_pic VALUES( 7,"img/product/sm/57e1ff17N286390a9.jpg","img/product/md/57e1ff17N286390a9.jpg","img/product/lg/57e1ff17N286390a9.jpg ");
INSERT INTO xz_laptop_pic VALUES( 7,"img/product/sm/57e1ff2fN8a36d0fe.jpg","img/product/md/57e1ff2fN8a36d0fe.jpg","img/product/lg/57e1ff2fN8a36d0fe.jpg ");
INSERT INTO xz_laptop_pic VALUES( 7,"img/product/sm/57e52dffNa4d8ce2c.jpg","img/product/md/57e52dffNa4d8ce2c.jpg","img/product/lg/57e52dffNa4d8ce2c.jpg ");
INSERT INTO xz_laptop_pic VALUES( 7,"img/product/sm/57e52e03N4ec367dd.jpg","img/product/md/57e52e03N4ec367dd.jpg","img/product/lg/57e52e03N4ec367dd.jpg ");
INSERT INTO xz_laptop_pic VALUES( 7,"img/product/sm/57e52e06N116974f7.jpg","img/product/md/57e52e06N116974f7.jpg","img/product/lg/57e52e06N116974f7.jpg ");
INSERT INTO xz_laptop_pic VALUES( 8,"img/product/sm/57e3b072N661cd00d.jpg","img/product/md/57e3b072N661cd00d.jpg","img/product/lg/57e3b072N661cd00d.jpg ");
INSERT INTO xz_laptop_pic VALUES( 8,"img/product/sm/57e1ff09Nf610fea3.jpg","img/product/md/57e1ff09Nf610fea3.jpg","img/product/lg/57e1ff09Nf610fea3.jpg ");
INSERT INTO xz_laptop_pic VALUES( 8,"img/product/sm/57e1ff17N286390a9.jpg","img/product/md/57e1ff17N286390a9.jpg","img/product/lg/57e1ff17N286390a9.jpg ");
INSERT INTO xz_laptop_pic VALUES( 8,"img/product/sm/57e1ff2fN8a36d0fe.jpg","img/product/md/57e1ff2fN8a36d0fe.jpg","img/product/lg/57e1ff2fN8a36d0fe.jpg ");
INSERT INTO xz_laptop_pic VALUES( 8,"img/product/sm/57e52dffNa4d8ce2c.jpg","img/product/md/57e52dffNa4d8ce2c.jpg","img/product/lg/57e52dffNa4d8ce2c.jpg ");
INSERT INTO xz_laptop_pic VALUES( 8,"img/product/sm/57e52e03N4ec367dd.jpg","img/product/md/57e52e03N4ec367dd.jpg","img/product/lg/57e52e03N4ec367dd.jpg ");
INSERT INTO xz_laptop_pic VALUES( 8,"img/product/sm/57e52e06N116974f7.jpg","img/product/md/57e52e06N116974f7.jpg","img/product/lg/57e52e06N116974f7.jpg ");
INSERT INTO xz_laptop_pic VALUES( 9,"img/product/sm/584b5678Nbc9f1e70.jpg","img/product/md/584b5678Nbc9f1e70.jpg","img/product/lg/584b5678Nbc9f1e70.jpg ");
INSERT INTO xz_laptop_pic VALUES( 9,"img/product/sm/584b567dNd9c58341.jpg","img/product/md/584b567dNd9c58341.jpg","img/product/lg/584b567dNd9c58341.jpg ");
INSERT INTO xz_laptop_pic VALUES( 9,"img/product/sm/5819a0ebNefd901bc.jpg","img/product/md/5819a0ebNefd901bc.jpg","img/product/lg/5819a0ebNefd901bc.jpg ");
INSERT INTO xz_laptop_pic VALUES( 9,"img/product/sm/5819a106Necf0abb8.jpg","img/product/md/5819a106Necf0abb8.jpg","img/product/lg/5819a106Necf0abb8.jpg ");
INSERT INTO xz_laptop_pic VALUES( 9,"img/product/sm/5819a10bN2ea5c8e0.jpg","img/product/md/5819a10bN2ea5c8e0.jpg","img/product/lg/5819a10bN2ea5c8e0.jpg ");
INSERT INTO xz_laptop_pic VALUES( 9,"img/product/sm/5819a10fNd0f96a03.jpg","img/product/md/5819a10fNd0f96a03.jpg","img/product/lg/5819a10fNd0f96a03.jpg ");
INSERT INTO xz_laptop_pic VALUES( 9,"img/product/sm/5819a114Ne0cd75db.jpg","img/product/md/5819a114Ne0cd75db.jpg","img/product/lg/5819a114Ne0cd75db.jpg ");
INSERT INTO xz_laptop_pic VALUES( 9,"img/product/sm/5819a133N03021b26.jpg","img/product/md/5819a133N03021b26.jpg","img/product/lg/5819a133N03021b26.jpg ");
INSERT INTO xz_laptop_pic VALUES(10,"img/product/sm/584b5678Nbc9f1e70.jpg","img/product/md/584b5678Nbc9f1e70.jpg","img/product/lg/584b5678Nbc9f1e70.jpg ");
INSERT INTO xz_laptop_pic VALUES(10,"img/product/sm/584b567dNd9c58341.jpg","img/product/md/584b567dNd9c58341.jpg","img/product/lg/584b567dNd9c58341.jpg ");
INSERT INTO xz_laptop_pic VALUES(10,"img/product/sm/5819a0ebNefd901bc.jpg","img/product/md/5819a0ebNefd901bc.jpg","img/product/lg/5819a0ebNefd901bc.jpg ");
INSERT INTO xz_laptop_pic VALUES(10,"img/product/sm/5819a106Necf0abb8.jpg","img/product/md/5819a106Necf0abb8.jpg","img/product/lg/5819a106Necf0abb8.jpg ");
INSERT INTO xz_laptop_pic VALUES(10,"img/product/sm/5819a10bN2ea5c8e0.jpg","img/product/md/5819a10bN2ea5c8e0.jpg","img/product/lg/5819a10bN2ea5c8e0.jpg ");
INSERT INTO xz_laptop_pic VALUES(10,"img/product/sm/5819a10fNd0f96a03.jpg","img/product/md/5819a10fNd0f96a03.jpg","img/product/lg/5819a10fNd0f96a03.jpg ");
INSERT INTO xz_laptop_pic VALUES(10,"img/product/sm/5819a114Ne0cd75db.jpg","img/product/md/5819a114Ne0cd75db.jpg","img/product/lg/5819a114Ne0cd75db.jpg ");
INSERT INTO xz_laptop_pic VALUES(10,"img/product/sm/5819a133N03021b26.jpg","img/product/md/5819a133N03021b26.jpg","img/product/lg/5819a133N03021b26.jpg ");
INSERT INTO xz_laptop_pic VALUES(11,"img/product/sm/584b5678Nbc9f1e70.jpg","img/product/md/584b5678Nbc9f1e70.jpg","img/product/lg/584b5678Nbc9f1e70.jpg ");
INSERT INTO xz_laptop_pic VALUES(11,"img/product/sm/584b567dNd9c58341.jpg","img/product/md/584b567dNd9c58341.jpg","img/product/lg/584b567dNd9c58341.jpg ");
INSERT INTO xz_laptop_pic VALUES(11,"img/product/sm/5819a0ebNefd901bc.jpg","img/product/md/5819a0ebNefd901bc.jpg","img/product/lg/5819a0ebNefd901bc.jpg ");
INSERT INTO xz_laptop_pic VALUES(11,"img/product/sm/5819a106Necf0abb8.jpg","img/product/md/5819a106Necf0abb8.jpg","img/product/lg/5819a106Necf0abb8.jpg ");
INSERT INTO xz_laptop_pic VALUES(11,"img/product/sm/5819a10bN2ea5c8e0.jpg","img/product/md/5819a10bN2ea5c8e0.jpg","img/product/lg/5819a10bN2ea5c8e0.jpg ");
INSERT INTO xz_laptop_pic VALUES(11,"img/product/sm/5819a10fNd0f96a03.jpg","img/product/md/5819a10fNd0f96a03.jpg","img/product/lg/5819a10fNd0f96a03.jpg ");
INSERT INTO xz_laptop_pic VALUES(11,"img/product/sm/5819a114Ne0cd75db.jpg","img/product/md/5819a114Ne0cd75db.jpg","img/product/lg/5819a114Ne0cd75db.jpg ");
INSERT INTO xz_laptop_pic VALUES(11,"img/product/sm/5819a133N03021b26.jpg","img/product/md/5819a133N03021b26.jpg","img/product/lg/5819a133N03021b26.jpg ");
INSERT INTO xz_laptop_pic VALUES(12,"img/product/sm/584b5678Nbc9f1e70.jpg","img/product/md/584b5678Nbc9f1e70.jpg","img/product/lg/584b5678Nbc9f1e70.jpg ");
INSERT INTO xz_laptop_pic VALUES(12,"img/product/sm/584b567dNd9c58341.jpg","img/product/md/584b567dNd9c58341.jpg","img/product/lg/584b567dNd9c58341.jpg ");
INSERT INTO xz_laptop_pic VALUES(12,"img/product/sm/5819a0ebNefd901bc.jpg","img/product/md/5819a0ebNefd901bc.jpg","img/product/lg/5819a0ebNefd901bc.jpg ");
INSERT INTO xz_laptop_pic VALUES(12,"img/product/sm/5819a106Necf0abb8.jpg","img/product/md/5819a106Necf0abb8.jpg","img/product/lg/5819a106Necf0abb8.jpg ");
INSERT INTO xz_laptop_pic VALUES(12,"img/product/sm/5819a10bN2ea5c8e0.jpg","img/product/md/5819a10bN2ea5c8e0.jpg","img/product/lg/5819a10bN2ea5c8e0.jpg ");
INSERT INTO xz_laptop_pic VALUES(12,"img/product/sm/5819a10fNd0f96a03.jpg","img/product/md/5819a10fNd0f96a03.jpg","img/product/lg/5819a10fNd0f96a03.jpg ");
INSERT INTO xz_laptop_pic VALUES(12,"img/product/sm/5819a114Ne0cd75db.jpg","img/product/md/5819a114Ne0cd75db.jpg","img/product/lg/5819a114Ne0cd75db.jpg ");
INSERT INTO xz_laptop_pic VALUES(12,"img/product/sm/5819a133N03021b26.jpg","img/product/md/5819a133N03021b26.jpg","img/product/lg/5819a133N03021b26.jpg ");
INSERT INTO xz_laptop_pic VALUES(13,"img/product/sm/590a98f9N8039f132.jpg","img/product/md/590a98f9N8039f132.jpg","img/product/lg/590a98f9N8039f132.jpg ");
INSERT INTO xz_laptop_pic VALUES(13,"img/product/sm/58f46de7N0dafbae3.jpg","img/product/md/58f46de7N0dafbae3.jpg","img/product/lg/58f46de7N0dafbae3.jpg ");
INSERT INTO xz_laptop_pic VALUES(13,"img/product/sm/58e5c226N4836a223.jpg","img/product/md/58e5c226N4836a223.jpg","img/product/lg/58e5c226N4836a223.jpg ");
INSERT INTO xz_laptop_pic VALUES(13,"img/product/sm/58dc76d5N8a0947a3.jpg","img/product/md/58dc76d5N8a0947a3.jpg","img/product/lg/58dc76d5N8a0947a3.jpg ");
INSERT INTO xz_laptop_pic VALUES(13,"img/product/sm/58fd9c54Nec723d68.jpg","img/product/md/58fd9c54Nec723d68.jpg","img/product/lg/58fd9c54Nec723d68.jpg ");
INSERT INTO xz_laptop_pic VALUES(13,"img/product/sm/58bfc2afNd44b4135.jpg","img/product/md/58bfc2afNd44b4135.jpg","img/product/lg/58bfc2afNd44b4135.jpg ");
INSERT INTO xz_laptop_pic VALUES(14,"img/product/sm/590a98f9N8039f132.jpg","img/product/md/590a98f9N8039f132.jpg","img/product/lg/590a98f9N8039f132.jpg ");
INSERT INTO xz_laptop_pic VALUES(14,"img/product/sm/58f46de7N0dafbae3.jpg","img/product/md/58f46de7N0dafbae3.jpg","img/product/lg/58f46de7N0dafbae3.jpg ");
INSERT INTO xz_laptop_pic VALUES(14,"img/product/sm/58e5c226N4836a223.jpg","img/product/md/58e5c226N4836a223.jpg","img/product/lg/58e5c226N4836a223.jpg ");
INSERT INTO xz_laptop_pic VALUES(14,"img/product/sm/58dc76d5N8a0947a3.jpg","img/product/md/58dc76d5N8a0947a3.jpg","img/product/lg/58dc76d5N8a0947a3.jpg ");
INSERT INTO xz_laptop_pic VALUES(14,"img/product/sm/58fd9c54Nec723d68.jpg","img/product/md/58fd9c54Nec723d68.jpg","img/product/lg/58fd9c54Nec723d68.jpg ");
INSERT INTO xz_laptop_pic VALUES(14,"img/product/sm/58bfc2afNd44b4135.jpg","img/product/md/58bfc2afNd44b4135.jpg","img/product/lg/58bfc2afNd44b4135.jpg ");
INSERT INTO xz_laptop_pic VALUES(15,"img/product/sm/590a98f9N8039f132.jpg","img/product/md/590a98f9N8039f132.jpg","img/product/lg/590a98f9N8039f132.jpg ");
INSERT INTO xz_laptop_pic VALUES(15,"img/product/sm/58f46de7N0dafbae3.jpg","img/product/md/58f46de7N0dafbae3.jpg","img/product/lg/58f46de7N0dafbae3.jpg ");
INSERT INTO xz_laptop_pic VALUES(15,"img/product/sm/58e5c226N4836a223.jpg","img/product/md/58e5c226N4836a223.jpg","img/product/lg/58e5c226N4836a223.jpg ");
INSERT INTO xz_laptop_pic VALUES(15,"img/product/sm/58dc76d5N8a0947a3.jpg","img/product/md/58dc76d5N8a0947a3.jpg","img/product/lg/58dc76d5N8a0947a3.jpg ");
INSERT INTO xz_laptop_pic VALUES(15,"img/product/sm/58fd9c54Nec723d68.jpg","img/product/md/58fd9c54Nec723d68.jpg","img/product/lg/58fd9c54Nec723d68.jpg ");
INSERT INTO xz_laptop_pic VALUES(15,"img/product/sm/58bfc2afNd44b4135.jpg","img/product/md/58bfc2afNd44b4135.jpg","img/product/lg/58bfc2afNd44b4135.jpg ");
INSERT INTO xz_laptop_pic VALUES(16,"img/product/sm/590a98f9N8039f132.jpg","img/product/md/590a98f9N8039f132.jpg","img/product/lg/590a98f9N8039f132.jpg ");
INSERT INTO xz_laptop_pic VALUES(16,"img/product/sm/58f46de7N0dafbae3.jpg","img/product/md/58f46de7N0dafbae3.jpg","img/product/lg/58f46de7N0dafbae3.jpg ");
INSERT INTO xz_laptop_pic VALUES(16,"img/product/sm/58e5c226N4836a223.jpg","img/product/md/58e5c226N4836a223.jpg","img/product/lg/58e5c226N4836a223.jpg ");
INSERT INTO xz_laptop_pic VALUES(16,"img/product/sm/58dc76d5N8a0947a3.jpg","img/product/md/58dc76d5N8a0947a3.jpg","img/product/lg/58dc76d5N8a0947a3.jpg ");
INSERT INTO xz_laptop_pic VALUES(16,"img/product/sm/58fd9c54Nec723d68.jpg","img/product/md/58fd9c54Nec723d68.jpg","img/product/lg/58fd9c54Nec723d68.jpg ");
INSERT INTO xz_laptop_pic VALUES(16,"img/product/sm/58bfc2afNd44b4135.jpg","img/product/md/58bfc2afNd44b4135.jpg","img/product/lg/58bfc2afNd44b4135.jpg ");
INSERT INTO xz_laptop_pic VALUES(17,"img/product/sm/587f476aNcfbf7869.jpg","img/product/md/587f476aNcfbf7869.jpg","img/product/lg/587f476aNcfbf7869.jpg ");
INSERT INTO xz_laptop_pic VALUES(17,"img/product/sm/57871083Nefe2d3d6.jpg","img/product/md/57871083Nefe2d3d6.jpg","img/product/lg/57871083Nefe2d3d6.jpg ");
INSERT INTO xz_laptop_pic VALUES(17,"img/product/sm/57871086N86c8f0ab.jpg","img/product/md/57871086N86c8f0ab.jpg","img/product/lg/57871086N86c8f0ab.jpg ");
INSERT INTO xz_laptop_pic VALUES(17,"img/product/sm/5787107bN73d05ad5.jpg","img/product/md/5787107bN73d05ad5.jpg","img/product/lg/5787107bN73d05ad5.jpg ");
INSERT INTO xz_laptop_pic VALUES(17,"img/product/sm/5787109cNaf26e3b0.jpg","img/product/md/5787109cNaf26e3b0.jpg","img/product/lg/5787109cNaf26e3b0.jpg ");
INSERT INTO xz_laptop_pic VALUES(17,"img/product/sm/578710a0N07795fe5.jpg","img/product/md/578710a0N07795fe5.jpg","img/product/lg/578710a0N07795fe5.jpg ");
INSERT INTO xz_laptop_pic VALUES(17,"img/product/sm/578710a3Nc498e3ea.jpg","img/product/md/578710a3Nc498e3ea.jpg","img/product/lg/578710a3Nc498e3ea.jpg ");
INSERT INTO xz_laptop_pic VALUES(18,"img/product/sm/587f476aNcfbf7869.jpg","img/product/md/587f476aNcfbf7869.jpg","img/product/lg/587f476aNcfbf7869.jpg ");
INSERT INTO xz_laptop_pic VALUES(18,"img/product/sm/57871083Nefe2d3d6.jpg","img/product/md/57871083Nefe2d3d6.jpg","img/product/lg/57871083Nefe2d3d6.jpg ");
INSERT INTO xz_laptop_pic VALUES(18,"img/product/sm/57871086N86c8f0ab.jpg","img/product/md/57871086N86c8f0ab.jpg","img/product/lg/57871086N86c8f0ab.jpg ");
INSERT INTO xz_laptop_pic VALUES(18,"img/product/sm/5787107bN73d05ad5.jpg","img/product/md/5787107bN73d05ad5.jpg","img/product/lg/5787107bN73d05ad5.jpg ");
INSERT INTO xz_laptop_pic VALUES(18,"img/product/sm/5787109cNaf26e3b0.jpg","img/product/md/5787109cNaf26e3b0.jpg","img/product/lg/5787109cNaf26e3b0.jpg ");
INSERT INTO xz_laptop_pic VALUES(18,"img/product/sm/578710a0N07795fe5.jpg","img/product/md/578710a0N07795fe5.jpg","img/product/lg/578710a0N07795fe5.jpg ");
INSERT INTO xz_laptop_pic VALUES(18,"img/product/sm/578710a3Nc498e3ea.jpg","img/product/md/578710a3Nc498e3ea.jpg","img/product/lg/578710a3Nc498e3ea.jpg ");
INSERT INTO xz_laptop_pic VALUES(19,"img/product/sm/57bbc38eN9def8042.jpg","img/product/md/57bbc38eN9def8042.jpg","img/product/lg/57bbc38eN9def8042.jpg ");
INSERT INTO xz_laptop_pic VALUES(19,"img/product/sm/57ba6a27Nbb8d2dcf.jpg","img/product/md/57ba6a27Nbb8d2dcf.jpg","img/product/lg/57ba6a27Nbb8d2dcf.jpg ");
INSERT INTO xz_laptop_pic VALUES(19,"img/product/sm/57ba6a38N4f4670bd.jpg","img/product/md/57ba6a38N4f4670bd.jpg","img/product/lg/57ba6a38N4f4670bd.jpg ");
INSERT INTO xz_laptop_pic VALUES(19,"img/product/sm/57ba6a3dN54779e6a.jpg","img/product/md/57ba6a3dN54779e6a.jpg","img/product/lg/57ba6a3dN54779e6a.jpg ");
INSERT INTO xz_laptop_pic VALUES(19,"img/product/sm/57ba6a47N19af9c97.jpg","img/product/md/57ba6a47N19af9c97.jpg","img/product/lg/57ba6a47N19af9c97.jpg ");
INSERT INTO xz_laptop_pic VALUES(19,"img/product/sm/57ba6a4cNb83e292a.jpg","img/product/md/57ba6a4cNb83e292a.jpg","img/product/lg/57ba6a4cNb83e292a.jpg ");
INSERT INTO xz_laptop_pic VALUES(19,"img/product/sm/57ba6a56N1e3e3d63.jpg","img/product/md/57ba6a56N1e3e3d63.jpg","img/product/lg/57ba6a56N1e3e3d63.jpg ");
INSERT INTO xz_laptop_pic VALUES(20,"img/product/sm/57bbc38eN9def8042.jpg","img/product/md/57bbc38eN9def8042.jpg","img/product/lg/57bbc38eN9def8042.jpg ");
INSERT INTO xz_laptop_pic VALUES(20,"img/product/sm/57ba6a27Nbb8d2dcf.jpg","img/product/md/57ba6a27Nbb8d2dcf.jpg","img/product/lg/57ba6a27Nbb8d2dcf.jpg ");
INSERT INTO xz_laptop_pic VALUES(20,"img/product/sm/57ba6a38N4f4670bd.jpg","img/product/md/57ba6a38N4f4670bd.jpg","img/product/lg/57ba6a38N4f4670bd.jpg ");
INSERT INTO xz_laptop_pic VALUES(20,"img/product/sm/57ba6a3dN54779e6a.jpg","img/product/md/57ba6a3dN54779e6a.jpg","img/product/lg/57ba6a3dN54779e6a.jpg ");
INSERT INTO xz_laptop_pic VALUES(20,"img/product/sm/57ba6a47N19af9c97.jpg","img/product/md/57ba6a47N19af9c97.jpg","img/product/lg/57ba6a47N19af9c97.jpg ");
INSERT INTO xz_laptop_pic VALUES(20,"img/product/sm/57ba6a4cNb83e292a.jpg","img/product/md/57ba6a4cNb83e292a.jpg","img/product/lg/57ba6a4cNb83e292a.jpg ");
INSERT INTO xz_laptop_pic VALUES(20,"img/product/sm/57ba6a56N1e3e3d63.jpg","img/product/md/57ba6a56N1e3e3d63.jpg","img/product/lg/57ba6a56N1e3e3d63.jpg ");
INSERT INTO xz_laptop_pic VALUES(21,"img/product/sm/57bbc38eN9def8042.jpg","img/product/md/57bbc38eN9def8042.jpg","img/product/lg/57bbc38eN9def8042.jpg ");
INSERT INTO xz_laptop_pic VALUES(21,"img/product/sm/57ba6a27Nbb8d2dcf.jpg","img/product/md/57ba6a27Nbb8d2dcf.jpg","img/product/lg/57ba6a27Nbb8d2dcf.jpg ");
INSERT INTO xz_laptop_pic VALUES(21,"img/product/sm/57ba6a38N4f4670bd.jpg","img/product/md/57ba6a38N4f4670bd.jpg","img/product/lg/57ba6a38N4f4670bd.jpg ");
INSERT INTO xz_laptop_pic VALUES(21,"img/product/sm/57ba6a3dN54779e6a.jpg","img/product/md/57ba6a3dN54779e6a.jpg","img/product/lg/57ba6a3dN54779e6a.jpg ");
INSERT INTO xz_laptop_pic VALUES(21,"img/product/sm/57ba6a47N19af9c97.jpg","img/product/md/57ba6a47N19af9c97.jpg","img/product/lg/57ba6a47N19af9c97.jpg ");
INSERT INTO xz_laptop_pic VALUES(21,"img/product/sm/57ba6a4cNb83e292a.jpg","img/product/md/57ba6a4cNb83e292a.jpg","img/product/lg/57ba6a4cNb83e292a.jpg ");
INSERT INTO xz_laptop_pic VALUES(21,"img/product/sm/57ba6a56N1e3e3d63.jpg","img/product/md/57ba6a56N1e3e3d63.jpg","img/product/lg/57ba6a56N1e3e3d63.jpg ");
INSERT INTO xz_laptop_pic VALUES(22,"img/product/sm/5913f8ffN49fa143c.jpg","img/product/md/5913f8ffN49fa143c.jpg","img/product/lg/5913f8ffN49fa143c.jpg ");
INSERT INTO xz_laptop_pic VALUES(22,"img/product/sm/5913f903Nbffaa4fd.jpg","img/product/md/5913f903Nbffaa4fd.jpg","img/product/lg/5913f903Nbffaa4fd.jpg ");
INSERT INTO xz_laptop_pic VALUES(22,"img/product/sm/5913f907Ncbc65469.jpg","img/product/md/5913f907Ncbc65469.jpg","img/product/lg/5913f907Ncbc65469.jpg ");
INSERT INTO xz_laptop_pic VALUES(22,"img/product/sm/5913f90bN1b563f42.jpg","img/product/md/5913f90bN1b563f42.jpg","img/product/lg/5913f90bN1b563f42.jpg ");
INSERT INTO xz_laptop_pic VALUES(22,"img/product/sm/5913f90fN99370675.jpg","img/product/md/5913f90fN99370675.jpg","img/product/lg/5913f90fN99370675.jpg ");
INSERT INTO xz_laptop_pic VALUES(22,"img/product/sm/5913f93bNe4d2b3e5.jpg","img/product/md/5913f93bNe4d2b3e5.jpg","img/product/lg/5913f93bNe4d2b3e5.jpg ");
INSERT INTO xz_laptop_pic VALUES(22,"img/product/sm/5913f93fNfd79b4fc.jpg","img/product/md/5913f93fNfd79b4fc.jpg","img/product/lg/5913f93fNfd79b4fc.jpg ");
INSERT INTO xz_laptop_pic VALUES(23,"img/product/sm/5913f8ffN49fa143c.jpg","img/product/md/5913f8ffN49fa143c.jpg","img/product/lg/5913f8ffN49fa143c.jpg ");
INSERT INTO xz_laptop_pic VALUES(23,"img/product/sm/5913f903Nbffaa4fd.jpg","img/product/md/5913f903Nbffaa4fd.jpg","img/product/lg/5913f903Nbffaa4fd.jpg ");
INSERT INTO xz_laptop_pic VALUES(23,"img/product/sm/5913f907Ncbc65469.jpg","img/product/md/5913f907Ncbc65469.jpg","img/product/lg/5913f907Ncbc65469.jpg ");
INSERT INTO xz_laptop_pic VALUES(23,"img/product/sm/5913f90bN1b563f42.jpg","img/product/md/5913f90bN1b563f42.jpg","img/product/lg/5913f90bN1b563f42.jpg ");
INSERT INTO xz_laptop_pic VALUES(23,"img/product/sm/5913f90fN99370675.jpg","img/product/md/5913f90fN99370675.jpg","img/product/lg/5913f90fN99370675.jpg ");
INSERT INTO xz_laptop_pic VALUES(23,"img/product/sm/5913f93bNe4d2b3e5.jpg","img/product/md/5913f93bNe4d2b3e5.jpg","img/product/lg/5913f93bNe4d2b3e5.jpg ");
INSERT INTO xz_laptop_pic VALUES(23,"img/product/sm/5913f93fNfd79b4fc.jpg","img/product/md/5913f93fNfd79b4fc.jpg","img/product/lg/5913f93fNfd79b4fc.jpg ");
INSERT INTO xz_laptop_pic VALUES(24,"img/product/sm/5913f8ffN49fa143c.jpg","img/product/md/5913f8ffN49fa143c.jpg","img/product/lg/5913f8ffN49fa143c.jpg ");
INSERT INTO xz_laptop_pic VALUES(24,"img/product/sm/5913f903Nbffaa4fd.jpg","img/product/md/5913f903Nbffaa4fd.jpg","img/product/lg/5913f903Nbffaa4fd.jpg ");
INSERT INTO xz_laptop_pic VALUES(24,"img/product/sm/5913f907Ncbc65469.jpg","img/product/md/5913f907Ncbc65469.jpg","img/product/lg/5913f907Ncbc65469.jpg ");
INSERT INTO xz_laptop_pic VALUES(24,"img/product/sm/5913f90bN1b563f42.jpg","img/product/md/5913f90bN1b563f42.jpg","img/product/lg/5913f90bN1b563f42.jpg ");
INSERT INTO xz_laptop_pic VALUES(24,"img/product/sm/5913f90fN99370675.jpg","img/product/md/5913f90fN99370675.jpg","img/product/lg/5913f90fN99370675.jpg ");
INSERT INTO xz_laptop_pic VALUES(24,"img/product/sm/5913f93bNe4d2b3e5.jpg","img/product/md/5913f93bNe4d2b3e5.jpg","img/product/lg/5913f93bNe4d2b3e5.jpg ");
INSERT INTO xz_laptop_pic VALUES(24,"img/product/sm/5913f93fNfd79b4fc.jpg","img/product/md/5913f93fNfd79b4fc.jpg","img/product/lg/5913f93fNfd79b4fc.jpg ");
INSERT INTO xz_laptop_pic VALUES(25,"img/product/sm/5913f8ffN49fa143c.jpg","img/product/md/5913f8ffN49fa143c.jpg","img/product/lg/5913f8ffN49fa143c.jpg ");
INSERT INTO xz_laptop_pic VALUES(25,"img/product/sm/5913f903Nbffaa4fd.jpg","img/product/md/5913f903Nbffaa4fd.jpg","img/product/lg/5913f903Nbffaa4fd.jpg ");
INSERT INTO xz_laptop_pic VALUES(25,"img/product/sm/5913f907Ncbc65469.jpg","img/product/md/5913f907Ncbc65469.jpg","img/product/lg/5913f907Ncbc65469.jpg ");
INSERT INTO xz_laptop_pic VALUES(25,"img/product/sm/5913f90bN1b563f42.jpg","img/product/md/5913f90bN1b563f42.jpg","img/product/lg/5913f90bN1b563f42.jpg ");
INSERT INTO xz_laptop_pic VALUES(25,"img/product/sm/5913f90fN99370675.jpg","img/product/md/5913f90fN99370675.jpg","img/product/lg/5913f90fN99370675.jpg ");
INSERT INTO xz_laptop_pic VALUES(25,"img/product/sm/5913f93bNe4d2b3e5.jpg","img/product/md/5913f93bNe4d2b3e5.jpg","img/product/lg/5913f93bNe4d2b3e5.jpg ");
INSERT INTO xz_laptop_pic VALUES(25,"img/product/sm/5913f93fNfd79b4fc.jpg","img/product/md/5913f93fNfd79b4fc.jpg","img/product/lg/5913f93fNfd79b4fc.jpg ");
INSERT INTO xz_laptop_pic VALUES(26,"img/product/sm/5913f8ffN49fa143c.jpg","img/product/md/5913f8ffN49fa143c.jpg","img/product/lg/5913f8ffN49fa143c.jpg ");
INSERT INTO xz_laptop_pic VALUES(26,"img/product/sm/5913f903Nbffaa4fd.jpg","img/product/md/5913f903Nbffaa4fd.jpg","img/product/lg/5913f903Nbffaa4fd.jpg ");
INSERT INTO xz_laptop_pic VALUES(26,"img/product/sm/5913f907Ncbc65469.jpg","img/product/md/5913f907Ncbc65469.jpg","img/product/lg/5913f907Ncbc65469.jpg ");
INSERT INTO xz_laptop_pic VALUES(26,"img/product/sm/5913f90bN1b563f42.jpg","img/product/md/5913f90bN1b563f42.jpg","img/product/lg/5913f90bN1b563f42.jpg ");
INSERT INTO xz_laptop_pic VALUES(26,"img/product/sm/5913f90fN99370675.jpg","img/product/md/5913f90fN99370675.jpg","img/product/lg/5913f90fN99370675.jpg ");
INSERT INTO xz_laptop_pic VALUES(26,"img/product/sm/5913f93bNe4d2b3e5.jpg","img/product/md/5913f93bNe4d2b3e5.jpg","img/product/lg/5913f93bNe4d2b3e5.jpg ");
INSERT INTO xz_laptop_pic VALUES(26,"img/product/sm/5913f93fNfd79b4fc.jpg","img/product/md/5913f93fNfd79b4fc.jpg","img/product/lg/5913f93fNfd79b4fc.jpg ");
INSERT INTO xz_laptop_pic VALUES(27,"img/product/sm/5913f8ffN49fa143c.jpg","img/product/md/5913f8ffN49fa143c.jpg","img/product/lg/5913f8ffN49fa143c.jpg ");
INSERT INTO xz_laptop_pic VALUES(27,"img/product/sm/5913f903Nbffaa4fd.jpg","img/product/md/5913f903Nbffaa4fd.jpg","img/product/lg/5913f903Nbffaa4fd.jpg ");
INSERT INTO xz_laptop_pic VALUES(27,"img/product/sm/5913f907Ncbc65469.jpg","img/product/md/5913f907Ncbc65469.jpg","img/product/lg/5913f907Ncbc65469.jpg ");
INSERT INTO xz_laptop_pic VALUES(27,"img/product/sm/5913f90bN1b563f42.jpg","img/product/md/5913f90bN1b563f42.jpg","img/product/lg/5913f90bN1b563f42.jpg ");
INSERT INTO xz_laptop_pic VALUES(27,"img/product/sm/5913f90fN99370675.jpg","img/product/md/5913f90fN99370675.jpg","img/product/lg/5913f90fN99370675.jpg ");
INSERT INTO xz_laptop_pic VALUES(27,"img/product/sm/5913f93bNe4d2b3e5.jpg","img/product/md/5913f93bNe4d2b3e5.jpg","img/product/lg/5913f93bNe4d2b3e5.jpg ");
INSERT INTO xz_laptop_pic VALUES(27,"img/product/sm/5913f93fNfd79b4fc.jpg","img/product/md/5913f93fNfd79b4fc.jpg","img/product/lg/5913f93fNfd79b4fc.jpg ");
INSERT INTO xz_laptop_pic VALUES(28,"img/product/sm/584b5678Nbc9f1e70.jpg","img/product/md/584b5678Nbc9f1e70.jpg","img/product/lg/584b5678Nbc9f1e70.jpg ");
INSERT INTO xz_laptop_pic VALUES(28,"img/product/sm/584b567dNd9c58341.jpg","img/product/md/584b567dNd9c58341.jpg","img/product/lg/584b567dNd9c58341.jpg ");
INSERT INTO xz_laptop_pic VALUES(28,"img/product/sm/5819a0ebNefd901bc.jpg","img/product/md/5819a0ebNefd901bc.jpg","img/product/lg/5819a0ebNefd901bc.jpg ");
INSERT INTO xz_laptop_pic VALUES(28,"img/product/sm/5819a106Necf0abb8.jpg","img/product/md/5819a106Necf0abb8.jpg","img/product/lg/5819a106Necf0abb8.jpg ");
INSERT INTO xz_laptop_pic VALUES(28,"img/product/sm/5819a10bN2ea5c8e0.jpg","img/product/md/5819a10bN2ea5c8e0.jpg","img/product/lg/5819a10bN2ea5c8e0.jpg ");
INSERT INTO xz_laptop_pic VALUES(28,"img/product/sm/5819a10fNd0f96a03.jpg","img/product/md/5819a10fNd0f96a03.jpg","img/product/lg/5819a10fNd0f96a03.jpg ");
INSERT INTO xz_laptop_pic VALUES(28,"img/product/sm/5819a114Ne0cd75db.jpg","img/product/md/5819a114Ne0cd75db.jpg","img/product/lg/5819a114Ne0cd75db.jpg ");
INSERT INTO xz_laptop_pic VALUES(28,"img/product/sm/5819a133N03021b26.jpg","img/product/md/5819a133N03021b26.jpg","img/product/lg/5819a133N03021b26.jpg ");
INSERT INTO xz_laptop_pic VALUES(29,"img/product/sm/584b5678Nbc9f1e70.jpg","img/product/md/584b5678Nbc9f1e70.jpg","img/product/lg/584b5678Nbc9f1e70.jpg ");
INSERT INTO xz_laptop_pic VALUES(29,"img/product/sm/584b567dNd9c58341.jpg","img/product/md/584b567dNd9c58341.jpg","img/product/lg/584b567dNd9c58341.jpg ");
INSERT INTO xz_laptop_pic VALUES(29,"img/product/sm/5819a0ebNefd901bc.jpg","img/product/md/5819a0ebNefd901bc.jpg","img/product/lg/5819a0ebNefd901bc.jpg ");
INSERT INTO xz_laptop_pic VALUES(29,"img/product/sm/5819a106Necf0abb8.jpg","img/product/md/5819a106Necf0abb8.jpg","img/product/lg/5819a106Necf0abb8.jpg ");
INSERT INTO xz_laptop_pic VALUES(29,"img/product/sm/5819a10bN2ea5c8e0.jpg","img/product/md/5819a10bN2ea5c8e0.jpg","img/product/lg/5819a10bN2ea5c8e0.jpg ");
INSERT INTO xz_laptop_pic VALUES(29,"img/product/sm/5819a10fNd0f96a03.jpg","img/product/md/5819a10fNd0f96a03.jpg","img/product/lg/5819a10fNd0f96a03.jpg ");
INSERT INTO xz_laptop_pic VALUES(29,"img/product/sm/5819a114Ne0cd75db.jpg","img/product/md/5819a114Ne0cd75db.jpg","img/product/lg/5819a114Ne0cd75db.jpg ");
INSERT INTO xz_laptop_pic VALUES(29,"img/product/sm/5819a133N03021b26.jpg","img/product/md/5819a133N03021b26.jpg","img/product/lg/5819a133N03021b26.jpg ");
INSERT INTO xz_laptop_pic VALUES(30,"img/product/sm/584b5678Nbc9f1e70.jpg","img/product/md/584b5678Nbc9f1e70.jpg","img/product/lg/584b5678Nbc9f1e70.jpg ");
INSERT INTO xz_laptop_pic VALUES(30,"img/product/sm/584b567dNd9c58341.jpg","img/product/md/584b567dNd9c58341.jpg","img/product/lg/584b567dNd9c58341.jpg ");
INSERT INTO xz_laptop_pic VALUES(30,"img/product/sm/5819a0ebNefd901bc.jpg","img/product/md/5819a0ebNefd901bc.jpg","img/product/lg/5819a0ebNefd901bc.jpg ");
INSERT INTO xz_laptop_pic VALUES(30,"img/product/sm/5819a106Necf0abb8.jpg","img/product/md/5819a106Necf0abb8.jpg","img/product/lg/5819a106Necf0abb8.jpg ");
INSERT INTO xz_laptop_pic VALUES(30,"img/product/sm/5819a10bN2ea5c8e0.jpg","img/product/md/5819a10bN2ea5c8e0.jpg","img/product/lg/5819a10bN2ea5c8e0.jpg ");
INSERT INTO xz_laptop_pic VALUES(30,"img/product/sm/5819a10fNd0f96a03.jpg","img/product/md/5819a10fNd0f96a03.jpg","img/product/lg/5819a10fNd0f96a03.jpg ");
INSERT INTO xz_laptop_pic VALUES(30,"img/product/sm/5819a114Ne0cd75db.jpg","img/product/md/5819a114Ne0cd75db.jpg","img/product/lg/5819a114Ne0cd75db.jpg ");
INSERT INTO xz_laptop_pic VALUES(30,"img/product/sm/5819a133N03021b26.jpg","img/product/md/5819a133N03021b26.jpg","img/product/lg/5819a133N03021b26.jpg ");
INSERT INTO xz_laptop_pic VALUES(31,"img/product/sm/584b5678Nbc9f1e70.jpg","img/product/md/584b5678Nbc9f1e70.jpg","img/product/lg/584b5678Nbc9f1e70.jpg ");
INSERT INTO xz_laptop_pic VALUES(31,"img/product/sm/584b567dNd9c58341.jpg","img/product/md/584b567dNd9c58341.jpg","img/product/lg/584b567dNd9c58341.jpg ");
INSERT INTO xz_laptop_pic VALUES(31,"img/product/sm/5819a0ebNefd901bc.jpg","img/product/md/5819a0ebNefd901bc.jpg","img/product/lg/5819a0ebNefd901bc.jpg ");
INSERT INTO xz_laptop_pic VALUES(31,"img/product/sm/5819a106Necf0abb8.jpg","img/product/md/5819a106Necf0abb8.jpg","img/product/lg/5819a106Necf0abb8.jpg ");
INSERT INTO xz_laptop_pic VALUES(31,"img/product/sm/5819a10bN2ea5c8e0.jpg","img/product/md/5819a10bN2ea5c8e0.jpg","img/product/lg/5819a10bN2ea5c8e0.jpg ");
INSERT INTO xz_laptop_pic VALUES(31,"img/product/sm/5819a10fNd0f96a03.jpg","img/product/md/5819a10fNd0f96a03.jpg","img/product/lg/5819a10fNd0f96a03.jpg ");
INSERT INTO xz_laptop_pic VALUES(31,"img/product/sm/5819a114Ne0cd75db.jpg","img/product/md/5819a114Ne0cd75db.jpg","img/product/lg/5819a114Ne0cd75db.jpg ");
INSERT INTO xz_laptop_pic VALUES(31,"img/product/sm/5819a133N03021b26.jpg","img/product/md/5819a133N03021b26.jpg","img/product/lg/5819a133N03021b26.jpg ");
INSERT INTO xz_laptop_pic VALUES(32,"img/product/sm/584b5678Nbc9f1e70.jpg","img/product/md/584b5678Nbc9f1e70.jpg","img/product/lg/584b5678Nbc9f1e70.jpg ");
INSERT INTO xz_laptop_pic VALUES(32,"img/product/sm/584b567dNd9c58341.jpg","img/product/md/584b567dNd9c58341.jpg","img/product/lg/584b567dNd9c58341.jpg ");
INSERT INTO xz_laptop_pic VALUES(32,"img/product/sm/5819a0ebNefd901bc.jpg","img/product/md/5819a0ebNefd901bc.jpg","img/product/lg/5819a0ebNefd901bc.jpg ");
INSERT INTO xz_laptop_pic VALUES(32,"img/product/sm/5819a106Necf0abb8.jpg","img/product/md/5819a106Necf0abb8.jpg","img/product/lg/5819a106Necf0abb8.jpg ");
INSERT INTO xz_laptop_pic VALUES(32,"img/product/sm/5819a10bN2ea5c8e0.jpg","img/product/md/5819a10bN2ea5c8e0.jpg","img/product/lg/5819a10bN2ea5c8e0.jpg ");
INSERT INTO xz_laptop_pic VALUES(32,"img/product/sm/5819a10fNd0f96a03.jpg","img/product/md/5819a10fNd0f96a03.jpg","img/product/lg/5819a10fNd0f96a03.jpg ");
INSERT INTO xz_laptop_pic VALUES(32,"img/product/sm/5819a114Ne0cd75db.jpg","img/product/md/5819a114Ne0cd75db.jpg","img/product/lg/5819a114Ne0cd75db.jpg ");
INSERT INTO xz_laptop_pic VALUES(32,"img/product/sm/5819a133N03021b26.jpg","img/product/md/5819a133N03021b26.jpg","img/product/lg/5819a133N03021b26.jpg ");
INSERT INTO xz_laptop_pic VALUES(33,"img/product/sm/58985861N615a3581.jpg","img/product/md/58985861N615a3581.jpg","img/product/lg/58985861N615a3581.jpg ");
INSERT INTO xz_laptop_pic VALUES(33,"img/product/sm/58985867Nf8909d49.jpg","img/product/md/58985867Nf8909d49.jpg","img/product/lg/58985867Nf8909d49.jpg ");
INSERT INTO xz_laptop_pic VALUES(33,"img/product/sm/5898586cNe235284b.jpg","img/product/md/5898586cNe235284b.jpg","img/product/lg/5898586cNe235284b.jpg ");
INSERT INTO xz_laptop_pic VALUES(33,"img/product/sm/58985881N0a78dea2.jpg","img/product/md/58985881N0a78dea2.jpg","img/product/lg/58985881N0a78dea2.jpg ");
INSERT INTO xz_laptop_pic VALUES(33,"img/product/sm/58985883Nd4aec745.jpg","img/product/md/58985883Nd4aec745.jpg","img/product/lg/58985883Nd4aec745.jpg ");
INSERT INTO xz_laptop_pic VALUES(33,"img/product/sm/5836b979N85c3852b.jpg","img/product/md/5836b979N85c3852b.jpg","img/product/lg/5836b979N85c3852b.jpg ");
INSERT INTO xz_laptop_pic VALUES(33,"img/product/sm/5836b981Nd60fd02a.jpg","img/product/md/5836b981Nd60fd02a.jpg","img/product/lg/5836b981Nd60fd02a.jpg ");
INSERT INTO xz_laptop_pic VALUES(34,"img/product/sm/58985861N615a3581.jpg","img/product/md/58985861N615a3581.jpg","img/product/lg/58985861N615a3581.jpg ");
INSERT INTO xz_laptop_pic VALUES(34,"img/product/sm/58985867Nf8909d49.jpg","img/product/md/58985867Nf8909d49.jpg","img/product/lg/58985867Nf8909d49.jpg ");
INSERT INTO xz_laptop_pic VALUES(34,"img/product/sm/5898586cNe235284b.jpg","img/product/md/5898586cNe235284b.jpg","img/product/lg/5898586cNe235284b.jpg ");
INSERT INTO xz_laptop_pic VALUES(34,"img/product/sm/58985881N0a78dea2.jpg","img/product/md/58985881N0a78dea2.jpg","img/product/lg/58985881N0a78dea2.jpg ");
INSERT INTO xz_laptop_pic VALUES(34,"img/product/sm/58985883Nd4aec745.jpg","img/product/md/58985883Nd4aec745.jpg","img/product/lg/58985883Nd4aec745.jpg ");
INSERT INTO xz_laptop_pic VALUES(34,"img/product/sm/5836b979N85c3852b.jpg","img/product/md/5836b979N85c3852b.jpg","img/product/lg/5836b979N85c3852b.jpg ");
INSERT INTO xz_laptop_pic VALUES(34,"img/product/sm/5836b981Nd60fd02a.jpg","img/product/md/5836b981Nd60fd02a.jpg","img/product/lg/5836b981Nd60fd02a.jpg ");
INSERT INTO xz_laptop_pic VALUES(35,"img/product/sm/58985861N615a3581.jpg","img/product/md/58985861N615a3581.jpg","img/product/lg/58985861N615a3581.jpg ");
INSERT INTO xz_laptop_pic VALUES(35,"img/product/sm/58985867Nf8909d49.jpg","img/product/md/58985867Nf8909d49.jpg","img/product/lg/58985867Nf8909d49.jpg ");
INSERT INTO xz_laptop_pic VALUES(35,"img/product/sm/5898586cNe235284b.jpg","img/product/md/5898586cNe235284b.jpg","img/product/lg/5898586cNe235284b.jpg ");
INSERT INTO xz_laptop_pic VALUES(35,"img/product/sm/58985881N0a78dea2.jpg","img/product/md/58985881N0a78dea2.jpg","img/product/lg/58985881N0a78dea2.jpg ");
INSERT INTO xz_laptop_pic VALUES(35,"img/product/sm/58985883Nd4aec745.jpg","img/product/md/58985883Nd4aec745.jpg","img/product/lg/58985883Nd4aec745.jpg ");
INSERT INTO xz_laptop_pic VALUES(35,"img/product/sm/5836b979N85c3852b.jpg","img/product/md/5836b979N85c3852b.jpg","img/product/lg/5836b979N85c3852b.jpg ");
INSERT INTO xz_laptop_pic VALUES(35,"img/product/sm/5836b981Nd60fd02a.jpg","img/product/md/5836b981Nd60fd02a.jpg","img/product/lg/5836b981Nd60fd02a.jpg ");
INSERT INTO xz_laptop_pic VALUES(36,"img/product/sm/58985861N615a3581.jpg","img/product/md/58985861N615a3581.jpg","img/product/lg/58985861N615a3581.jpg ");
INSERT INTO xz_laptop_pic VALUES(36,"img/product/sm/58985867Nf8909d49.jpg","img/product/md/58985867Nf8909d49.jpg","img/product/lg/58985867Nf8909d49.jpg ");
INSERT INTO xz_laptop_pic VALUES(36,"img/product/sm/5898586cNe235284b.jpg","img/product/md/5898586cNe235284b.jpg","img/product/lg/5898586cNe235284b.jpg ");
INSERT INTO xz_laptop_pic VALUES(36,"img/product/sm/58985881N0a78dea2.jpg","img/product/md/58985881N0a78dea2.jpg","img/product/lg/58985881N0a78dea2.jpg ");
INSERT INTO xz_laptop_pic VALUES(36,"img/product/sm/58985883Nd4aec745.jpg","img/product/md/58985883Nd4aec745.jpg","img/product/lg/58985883Nd4aec745.jpg ");
INSERT INTO xz_laptop_pic VALUES(36,"img/product/sm/5836b979N85c3852b.jpg","img/product/md/5836b979N85c3852b.jpg","img/product/lg/5836b979N85c3852b.jpg ");
INSERT INTO xz_laptop_pic VALUES(36,"img/product/sm/5836b981Nd60fd02a.jpg","img/product/md/5836b981Nd60fd02a.jpg","img/product/lg/5836b981Nd60fd02a.jpg ");
INSERT INTO xz_laptop_pic VALUES(37,"img/product/sm/58985861N615a3581.jpg","img/product/md/58985861N615a3581.jpg","img/product/lg/58985861N615a3581.jpg ");
INSERT INTO xz_laptop_pic VALUES(37,"img/product/sm/58985867Nf8909d49.jpg","img/product/md/58985867Nf8909d49.jpg","img/product/lg/58985867Nf8909d49.jpg ");
INSERT INTO xz_laptop_pic VALUES(37,"img/product/sm/5898586cNe235284b.jpg","img/product/md/5898586cNe235284b.jpg","img/product/lg/5898586cNe235284b.jpg ");
INSERT INTO xz_laptop_pic VALUES(37,"img/product/sm/58985881N0a78dea2.jpg","img/product/md/58985881N0a78dea2.jpg","img/product/lg/58985881N0a78dea2.jpg ");
INSERT INTO xz_laptop_pic VALUES(37,"img/product/sm/58985883Nd4aec745.jpg","img/product/md/58985883Nd4aec745.jpg","img/product/lg/58985883Nd4aec745.jpg ");
INSERT INTO xz_laptop_pic VALUES(37,"img/product/sm/5836b979N85c3852b.jpg","img/product/md/5836b979N85c3852b.jpg","img/product/lg/5836b979N85c3852b.jpg ");
INSERT INTO xz_laptop_pic VALUES(37,"img/product/sm/5836b981Nd60fd02a.jpg","img/product/md/5836b981Nd60fd02a.jpg","img/product/lg/5836b981Nd60fd02a.jpg ");
INSERT INTO xz_laptop_pic VALUES(38,"img/product/sm/58a2c667Ne2b5cb73.jpg","img/product/md/58a2c667Ne2b5cb73.jpg","img/product/lg/58a2c667Ne2b5cb73.jpg ");
INSERT INTO xz_laptop_pic VALUES(38,"img/product/sm/58a2c668N800be261.jpg","img/product/md/58a2c668N800be261.jpg","img/product/lg/58a2c668N800be261.jpg ");
INSERT INTO xz_laptop_pic VALUES(38,"img/product/sm/58a2c668N0159a26f.jpg","img/product/md/58a2c668N0159a26f.jpg","img/product/lg/58a2c668N0159a26f.jpg ");
INSERT INTO xz_laptop_pic VALUES(38,"img/product/sm/58a2c669Nf884ac31.jpg","img/product/md/58a2c669Nf884ac31.jpg","img/product/lg/58a2c669Nf884ac31.jpg ");
INSERT INTO xz_laptop_pic VALUES(38,"img/product/sm/58a2c668N7293a0d1.jpg","img/product/md/58a2c668N7293a0d1.jpg","img/product/lg/58a2c668N7293a0d1.jpg ");
INSERT INTO xz_laptop_pic VALUES(38,"img/product/sm/58a2c669N4f92f8cb.jpg","img/product/md/58a2c669N4f92f8cb.jpg","img/product/lg/58a2c669N4f92f8cb.jpg ");
INSERT INTO xz_laptop_pic VALUES(38,"img/product/sm/58a2c668N0be41fb0.jpg","img/product/md/58a2c668N0be41fb0.jpg","img/product/lg/58a2c668N0be41fb0.jpg ");
INSERT INTO xz_laptop_pic VALUES(38,"img/product/sm/58a2c66aNcd10ee32.jpg","img/product/md/58a2c66aNcd10ee32.jpg","img/product/lg/58a2c66aNcd10ee32.jpg ");
INSERT INTO xz_laptop_pic VALUES(39,"img/product/sm/58a2c667Ne2b5cb73.jpg","img/product/md/58a2c667Ne2b5cb73.jpg","img/product/lg/58a2c667Ne2b5cb73.jpg ");
INSERT INTO xz_laptop_pic VALUES(39,"img/product/sm/58a2c668N800be261.jpg","img/product/md/58a2c668N800be261.jpg","img/product/lg/58a2c668N800be261.jpg ");
INSERT INTO xz_laptop_pic VALUES(39,"img/product/sm/58a2c668N0159a26f.jpg","img/product/md/58a2c668N0159a26f.jpg","img/product/lg/58a2c668N0159a26f.jpg ");
INSERT INTO xz_laptop_pic VALUES(39,"img/product/sm/58a2c669Nf884ac31.jpg","img/product/md/58a2c669Nf884ac31.jpg","img/product/lg/58a2c669Nf884ac31.jpg ");
INSERT INTO xz_laptop_pic VALUES(39,"img/product/sm/58a2c668N7293a0d1.jpg","img/product/md/58a2c668N7293a0d1.jpg","img/product/lg/58a2c668N7293a0d1.jpg ");
INSERT INTO xz_laptop_pic VALUES(39,"img/product/sm/58a2c669N4f92f8cb.jpg","img/product/md/58a2c669N4f92f8cb.jpg","img/product/lg/58a2c669N4f92f8cb.jpg ");
INSERT INTO xz_laptop_pic VALUES(39,"img/product/sm/58a2c668N0be41fb0.jpg","img/product/md/58a2c668N0be41fb0.jpg","img/product/lg/58a2c668N0be41fb0.jpg ");
INSERT INTO xz_laptop_pic VALUES(39,"img/product/sm/58a2c66aNcd10ee32.jpg","img/product/md/58a2c66aNcd10ee32.jpg","img/product/lg/58a2c66aNcd10ee32.jpg ");
INSERT INTO xz_laptop_pic VALUES(40,"img/product/sm/58a2c667Ne2b5cb73.jpg","img/product/md/58a2c667Ne2b5cb73.jpg","img/product/lg/58a2c667Ne2b5cb73.jpg ");
INSERT INTO xz_laptop_pic VALUES(40,"img/product/sm/58a2c668N800be261.jpg","img/product/md/58a2c668N800be261.jpg","img/product/lg/58a2c668N800be261.jpg ");
INSERT INTO xz_laptop_pic VALUES(40,"img/product/sm/58a2c668N0159a26f.jpg","img/product/md/58a2c668N0159a26f.jpg","img/product/lg/58a2c668N0159a26f.jpg ");
INSERT INTO xz_laptop_pic VALUES(40,"img/product/sm/58a2c669Nf884ac31.jpg","img/product/md/58a2c669Nf884ac31.jpg","img/product/lg/58a2c669Nf884ac31.jpg ");
INSERT INTO xz_laptop_pic VALUES(40,"img/product/sm/58a2c668N7293a0d1.jpg","img/product/md/58a2c668N7293a0d1.jpg","img/product/lg/58a2c668N7293a0d1.jpg ");
INSERT INTO xz_laptop_pic VALUES(40,"img/product/sm/58a2c669N4f92f8cb.jpg","img/product/md/58a2c669N4f92f8cb.jpg","img/product/lg/58a2c669N4f92f8cb.jpg ");
INSERT INTO xz_laptop_pic VALUES(40,"img/product/sm/58a2c668N0be41fb0.jpg","img/product/md/58a2c668N0be41fb0.jpg","img/product/lg/58a2c668N0be41fb0.jpg ");
INSERT INTO xz_laptop_pic VALUES(40,"img/product/sm/58a2c66aNcd10ee32.jpg","img/product/md/58a2c66aNcd10ee32.jpg","img/product/lg/58a2c66aNcd10ee32.jpg ");
INSERT INTO xz_laptop_pic VALUES(41,"img/product/sm/58a2c667Ne2b5cb73.jpg","img/product/md/58a2c667Ne2b5cb73.jpg","img/product/lg/58a2c667Ne2b5cb73.jpg ");
INSERT INTO xz_laptop_pic VALUES(41,"img/product/sm/58a2c668N800be261.jpg","img/product/md/58a2c668N800be261.jpg","img/product/lg/58a2c668N800be261.jpg ");
INSERT INTO xz_laptop_pic VALUES(41,"img/product/sm/58a2c668N0159a26f.jpg","img/product/md/58a2c668N0159a26f.jpg","img/product/lg/58a2c668N0159a26f.jpg ");
INSERT INTO xz_laptop_pic VALUES(41,"img/product/sm/58a2c669Nf884ac31.jpg","img/product/md/58a2c669Nf884ac31.jpg","img/product/lg/58a2c669Nf884ac31.jpg ");
INSERT INTO xz_laptop_pic VALUES(41,"img/product/sm/58a2c668N7293a0d1.jpg","img/product/md/58a2c668N7293a0d1.jpg","img/product/lg/58a2c668N7293a0d1.jpg ");
INSERT INTO xz_laptop_pic VALUES(41,"img/product/sm/58a2c669N4f92f8cb.jpg","img/product/md/58a2c669N4f92f8cb.jpg","img/product/lg/58a2c669N4f92f8cb.jpg ");
INSERT INTO xz_laptop_pic VALUES(41,"img/product/sm/58a2c668N0be41fb0.jpg","img/product/md/58a2c668N0be41fb0.jpg","img/product/lg/58a2c668N0be41fb0.jpg ");
INSERT INTO xz_laptop_pic VALUES(41,"img/product/sm/58a2c66aNcd10ee32.jpg","img/product/md/58a2c66aNcd10ee32.jpg","img/product/lg/58a2c66aNcd10ee32.jpg ");
INSERT INTO xz_laptop_pic VALUES(42,"img/product/sm/58a2c667Ne2b5cb73.jpg","img/product/md/58a2c667Ne2b5cb73.jpg","img/product/lg/58a2c667Ne2b5cb73.jpg ");
INSERT INTO xz_laptop_pic VALUES(42,"img/product/sm/58a2c668N800be261.jpg","img/product/md/58a2c668N800be261.jpg","img/product/lg/58a2c668N800be261.jpg ");
INSERT INTO xz_laptop_pic VALUES(42,"img/product/sm/58a2c668N0159a26f.jpg","img/product/md/58a2c668N0159a26f.jpg","img/product/lg/58a2c668N0159a26f.jpg ");
INSERT INTO xz_laptop_pic VALUES(42,"img/product/sm/58a2c669Nf884ac31.jpg","img/product/md/58a2c669Nf884ac31.jpg","img/product/lg/58a2c669Nf884ac31.jpg ");
INSERT INTO xz_laptop_pic VALUES(42,"img/product/sm/58a2c668N7293a0d1.jpg","img/product/md/58a2c668N7293a0d1.jpg","img/product/lg/58a2c668N7293a0d1.jpg ");
INSERT INTO xz_laptop_pic VALUES(42,"img/product/sm/58a2c669N4f92f8cb.jpg","img/product/md/58a2c669N4f92f8cb.jpg","img/product/lg/58a2c669N4f92f8cb.jpg ");
INSERT INTO xz_laptop_pic VALUES(42,"img/product/sm/58a2c668N0be41fb0.jpg","img/product/md/58a2c668N0be41fb0.jpg","img/product/lg/58a2c668N0be41fb0.jpg ");
INSERT INTO xz_laptop_pic VALUES(42,"img/product/sm/58a2c66aNcd10ee32.jpg","img/product/md/58a2c66aNcd10ee32.jpg","img/product/lg/58a2c66aNcd10ee32.jpg ");
INSERT INTO xz_laptop_pic VALUES(43,"img/product/sm/58a2c667Ne2b5cb73.jpg","img/product/md/58a2c667Ne2b5cb73.jpg","img/product/lg/58a2c667Ne2b5cb73.jpg ");
INSERT INTO xz_laptop_pic VALUES(43,"img/product/sm/58a2c668N800be261.jpg","img/product/md/58a2c668N800be261.jpg","img/product/lg/58a2c668N800be261.jpg ");
INSERT INTO xz_laptop_pic VALUES(43,"img/product/sm/58a2c668N0159a26f.jpg","img/product/md/58a2c668N0159a26f.jpg","img/product/lg/58a2c668N0159a26f.jpg ");
INSERT INTO xz_laptop_pic VALUES(43,"img/product/sm/58a2c669Nf884ac31.jpg","img/product/md/58a2c669Nf884ac31.jpg","img/product/lg/58a2c669Nf884ac31.jpg ");
INSERT INTO xz_laptop_pic VALUES(43,"img/product/sm/58a2c668N7293a0d1.jpg","img/product/md/58a2c668N7293a0d1.jpg","img/product/lg/58a2c668N7293a0d1.jpg ");
INSERT INTO xz_laptop_pic VALUES(43,"img/product/sm/58a2c669N4f92f8cb.jpg","img/product/md/58a2c669N4f92f8cb.jpg","img/product/lg/58a2c669N4f92f8cb.jpg ");
INSERT INTO xz_laptop_pic VALUES(43,"img/product/sm/58a2c668N0be41fb0.jpg","img/product/md/58a2c668N0be41fb0.jpg","img/product/lg/58a2c668N0be41fb0.jpg ");
INSERT INTO xz_laptop_pic VALUES(43,"img/product/sm/58a2c66aNcd10ee32.jpg","img/product/md/58a2c66aNcd10ee32.jpg","img/product/lg/58a2c66aNcd10ee32.jpg ");

INSERT INTO xz_index_carousel VALUES (NULL,28,"img/index/banner1.png");
INSERT INTO xz_index_carousel VALUES (NULL,19,"img/index/banner2.png");
INSERT INTO xz_index_carousel VALUES (NULL,1,"img/index/banner3.png");
INSERT INTO xz_index_carousel VALUES (NULL,9,"img/index/banner4.png");

INSERT INTO xz_index_product VALUES(1,1,"Apple MacBook Air系列","酷睿双核i5处理器|256GB SSD|8GB内存|英特尔HD显卡620含共享显卡内存","img/index/study_computer_img1.png");
INSERT INTO xz_index_product VALUES(2,5,"小米Air 金属超轻薄","酷睿双核i5处理器|512GB SSD|2GB内存|英特尔HD独立显卡","img/index/study_computer_img2.png");
INSERT INTO xz_index_product VALUES(3,9,"联想E480C 轻薄系列","酷睿双核i7处理器|256GB SSD|4GB内存|英特尔HD显卡680M","img/index/study_computer_img3.png");
INSERT INTO xz_index_product VALUES(4,13,"华硕RX310 金属超极本","酷睿双核i5处理器|512GB SSD|4GB内存|英特尔HD游戏级显卡"," img/index/study_computer_img4.png");
INSERT INTO xz_index_product VALUES(5,17,"联想小新700 电竞版游戏本","酷睿双核i7处理器|1TGB SSD|8GB内存|英特尔HD显卡620含共享显卡内存","img/index/study_computer_img5.png ");
INSERT INTO xz_index_product VALUES(6,19,"戴尔灵越燃7000 轻薄窄边","酷睿双核i5处理器|512GB SSD|2GB内存|英特尔HD显卡"," img/index/study_computer_img3.png ");
INSERT INTO xz_index_product VALUES(7,38,"神州战神Z7M 高性价比游戏本","酷睿双核i7处理器|1TGB SSD|8GB内存|英特尔HD游戏机独立显卡","img/index/study_computer_img4.png ");

INSERT INTO xz_user VALUES(NULL,"yangyang",123456,"13452038583@163.com","13452038583",DEFAULT,"申阳",1);