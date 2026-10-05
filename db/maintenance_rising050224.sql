CREATE TABLE `tb_customer` (
  `customer_id` varchar(255) PRIMARY KEY,
  `branch_id` varchar(255),
  `customer_name` varchar(255),
  `address_desc` varchar(255),
  `province_id` varchar(255),
  `district_id` varchar(255),
  `sub_district_id` varchar(255),
  `email` varchar(255),
  `phone_number` varchar(255),
  `create_date` datetime,
  `update_date` datetime,
  `create_by` varchar(255),
  `update_by` varchar(255)
);

CREATE TABLE `tb_user` (
  `user_id` varchar(255) PRIMARY KEY,
  `username` varchar(255),
  `password` varchar(255),
  `role_id` varchar(255),
  `first_name` varchar(255),
  `last_name` varchar(255),
  `tel` varchar(255),
  `email` varchar(255),
  `base64` mediumtext,
  `create_date` datetime,
  `update_date` datetime,
  `create_by` varchar(255),
  `update_by` varchar(255)
);

CREATE TABLE `tb_device` (
  `device_id` varchar(255) PRIMARY KEY,
  `device_name` varchar(255),
  `device_type_id` varchar(255),
  `brand` varchar(255),
  `Model` varchar(255),
  `size` varchar(255),
  `branch_id` varchar(255),
  `customer_id` varchar(255),
  `sequence_id` varchar(255),
  `base64` mediumtext,
  `device_status` boolean,
  `create_date` datetime,
  `update_date` datetime,
  `create_by` varchar(255),
  `update_by` varchar(255)
);

CREATE TABLE `tb_maintenance_history` (
  `mainternance_history_id` varchar(255) PRIMARY KEY,
  `device_id` varchar(255),
  `maintenance_id` varchar(255),
  `technician_id` varchar(255),
  `create_date` datetime,
  `update_date` datetime,
  `create_by` varchar(255),
  `update_by` varchar(255)
);

CREATE TABLE `tb_technician` (
  `technician_id` varchar(255) PRIMARY KEY,
  `technician_name` varchar(255),
  `create_date` datetime,
  `update_date` datetime,
  `create_by` varchar(255),
  `update_by` varchar(255)
);

CREATE TABLE `tb_maintenance` (
  `maintenance_id` varchar(255) PRIMARY KEY,
  `device_id` varchar(255),
  `maintenance_times` varchar(255),
  `maintenance_description` varchar(255),
  `maintenance_status` int,
  `create_date` datetime,
  `update_date` datetime,
  `create_by` varchar(255),
  `update_by` varchar(255)
);

CREATE TABLE `tb_role` (
  `role_id` varchar(255) PRIMARY KEY,
  `role_name` varchar(255),
  `create_date` datetime,
  `update_date` datetime,
  `create_by` varchar(255),
  `update_by` varchar(255)
);

CREATE TABLE `tb_permission` (
  `role_id` varchar(255),
  `menu_id` varchar(255),
  `permission_view` varchar(255),
  `permission_detail` varchar(255),
  `permission_insert` varchar(255),
  `permission_update` varchar(255),
  PRIMARY KEY (`role_id`, `menu_id`)
);

CREATE TABLE `tb_menu` (
  `menu_id` varchar(255) PRIMARY KEY,
  `menu_name` varchar(255),
  `menu_group` varchar(255)
);

CREATE TABLE `tb_branch` (
  `branch_id` varchar(255) PRIMARY KEY,
  `branch_name` varchar(255),
  `address_desc` varchar(255),
  `province_id` varchar(255),
  `district_id` varchar(255),
  `sub_district_id` varchar(255),
  `email` varchar(255),
  `phone_number` varchar(255),
  `latitude` varchar(255),
  `longtitude` varchar(255),
  `create_date` datetime,
  `update_date` datetime,
  `create_by` varchar(255),
  `update_by` varchar(255)
);

CREATE TABLE `tb_case` (
  `case_id` varchar(255) PRIMARY KEY,
  `case_runno` varchar(255),
  `case_desc` text,
  `create_date` datetime,
  `update_date` datetime,
  `create_by` varchar(255),
  `update_by` varchar(255)
);

CREATE TABLE `tb_measuring_point` (
  `measuring_point_id` varchar(255) PRIMARY KEY,
  `measuring_point_runno` varchar(255),
  `measuring_point_name` varchar(255),
  `create_date` datetime,
  `update_date` datetime,
  `create_by` varchar(255),
  `update_by` varchar(255)
);

CREATE TABLE `tb_bom` (
  `bom_id` varchar(255) PRIMARY KEY,
  `code` varchar(255),
  `no` varchar(255),
  `part_name` varchar(255),
  `branch_id` varchar(255),
  `device_type_id` varchar(255),
  `create_date` datetime,
  `update_date` datetime,
  `update_by` varchar(255),
  `create_by` varchar(255)
);

CREATE TABLE `tb_device_type` (
  `device_type_id` varchar(255) PRIMARY KEY,
  `device_type_name` varchar(255),
  `branch_id` varchar(255),
  `create_date` datetime,
  `update_date` datetime,
  `update_by` varchar(255),
  `create_by` varchar(255)
);

CREATE TABLE `tb_attachment` (
  `attachment_id` varchar(255) PRIMARY KEY,
  `base64` varchar(255),
  `ref_id` varchar(255),
  `create_date` datetime,
  `update_date` datetime,
  `update_by` varchar(255),
  `create_by` varchar(255)
);

ALTER TABLE `tb_customer` ADD FOREIGN KEY (`branch_id`) REFERENCES `tb_branch` (`branch_id`);

ALTER TABLE `tb_device` ADD FOREIGN KEY (`branch_id`) REFERENCES `tb_branch` (`branch_id`);

ALTER TABLE `tb_maintenance` ADD FOREIGN KEY (`device_id`) REFERENCES `tb_device` (`device_id`);

ALTER TABLE `tb_device_type` ADD FOREIGN KEY (`device_type_id`) REFERENCES `tb_device` (`device_type_id`);

ALTER TABLE `tb_maintenance_history` ADD FOREIGN KEY (`device_id`) REFERENCES `tb_maintenance` (`device_id`);

ALTER TABLE `tb_maintenance_history` ADD FOREIGN KEY (`maintenance_id`) REFERENCES `tb_maintenance` (`maintenance_id`);

ALTER TABLE `tb_role` ADD FOREIGN KEY (`role_id`) REFERENCES `tb_user` (`role_id`);

ALTER TABLE `tb_permission` ADD FOREIGN KEY (`menu_id`) REFERENCES `tb_menu` (`menu_id`);

ALTER TABLE `tb_permission` ADD FOREIGN KEY (`role_id`) REFERENCES `tb_role` (`role_id`);

ALTER TABLE `tb_maintenance_history` ADD FOREIGN KEY (`technician_id`) REFERENCES `tb_technician` (`technician_id`);

ALTER TABLE `tb_bom` ADD FOREIGN KEY (`branch_id`) REFERENCES `tb_branch` (`branch_id`);

ALTER TABLE `tb_device_type` ADD FOREIGN KEY (`device_type_id`) REFERENCES `tb_bom` (`device_type_id`);

ALTER TABLE `tb_device_type` ADD FOREIGN KEY (`branch_id`) REFERENCES `tb_branch` (`branch_id`);
