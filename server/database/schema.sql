create table if not exists  `user` (

   `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `age` INT NULL DEFAULT NULL,
  `genre` VARCHAR(20) NULL DEFAULT NULL,
  `picture` VARCHAR(100) NULL DEFAULT NULL,
  `inscription_date` DATE NOT NULL,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)

  );



INSERT INTO user (name, age, genre, picture, inscription_date, email, password)
VALUES
('Jean-louis', 50, 'homme', 'jlr.jpg', CURDATE(), 'jeanlouisroger44@gmail.com','Clarisse44'),
('Vito', 42, 'homme', 'vito.jpg', CURDATE(), 'viriato.ferreira44@gmail.com', '$argon2id$v=19$m=16,t=2,p=1$bEw3dkNYaWdNZVE3T1FSeQ$TwfjC09TeNpmtZl2va/KAQ'),
('Jean', 27, 'homme', 'jean.jpg', CURDATE(), 'jean@gmail.com', 'jaimelesucre'),
('Mireille', 32, 'femme', 'mireille.jpg', CURDATE(), 'mireille@gmail.com', 'jaimepaslesucre'),
('Camille', 35, 'femme', 'camille.jpg', CURDATE(), 'camille@gmail.com', 'VeGanForEver');


create table if not exists `evenements` (

  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `place` VARCHAR(25) NOT NULL,
  `number_of_places` INT NOT NULL CHECK (`number_of_places` > 0),
  `picture` VARCHAR(255) NULL
  );

INSERT INTO evenements (name, place, number_of_places, picture)
VALUES
('Hellfest', 'Clisson', 50000, 'https://www.riffx.fr/wp-content/uploads/2019/02/hellfest-logo.png'),
('Solidays', 'Paris', 30000, 'https://www.iledefrance.fr/sites/default/files/styles/side_main_banner_retina_desktop/public/2024-06/Solidays2024_1000.jpg.webp?itok=kmwMWs6n'),
('Rock en Seine', 'Paris', 40000, 'https://i0.wp.com/dancingfeet.fr/wp-content/uploads/2015/09/edito_rockenseine.jpg?resize=640%2C355'),
('Les Eurockéennes', 'Belfort', 50000, 'https://cdn-s-www.estrepublicain.fr/images/B675B325-733C-4CB0-B68F-0CDCC753B195/NW_raw/les-principales-tetes-d-affiche-des-prochaines-eurockeennes-de-belfort-ont-ete-annoncee-ce-jeudi-28-novembre-photo-michael-desprez-1732817455.jpg'),
('Les Vieilles Charrues', 'Carhaix', 60000, 'https://www.jaimeradio.fr/wp-content/uploads/2024/11/affiche_coloree_pour_les_vieilles_charrues_2025_481821_920_0_F1732533259731.webp');

CREATE TABLE IF NOT EXISTS `reservation` (
  `user_id` INT NOT NULL,
  `event_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `event_id`), 
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`event_id`) REFERENCES `evenements`(`id`) ON DELETE CASCADE
);
