CREATE SCHEMA IF NOT EXISTS bakery;
CREATE TABLE IF NOT EXISTS bakery.products (
  slug text PRIMARY KEY CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text NOT NULL CHECK (length(trim(name)) > 0),
  summary text NOT NULL,
  description text NOT NULL,
  badge text NOT NULL,
  image_key text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true
);

INSERT INTO bakery.products (slug, name, summary, description, badge, image_key, position)
VALUES
  ('sourdough', 'Sourdough Tradicional', 'Fermentação natural, casca crocante e miolo aerado.', 'Farinha nobre, água e sal. Fermentação natural de 36 horas para casca crocante e miolo aerado.', 'Fornada Limitada', 'sourdough', 10),
  ('rustico', 'Rústico de Cebola Roxa & Ervas', 'Cebola roxa caramelizada e ervas frescas.', 'Massa de levain recheada com cebola roxa caramelizada e ervas frescas do dia.', 'Fornada Limitada', 'rustic', 20),
  ('brioche', 'Trança de Brioche', 'Trança macia, dourada e amanteigada.', 'Amanteigada e macia, com manteiga pura e ovos caipiras. Dourada no ponto certo.', 'Sob Encomenda', 'brioche', 30),
  ('folhados', 'Folhados Artesanais', 'Croissants e folhados laminados à mão.', 'Croissants e folhados laminados à mão, em camadas finas de manteiga francesa.', 'Sob Encomenda', 'folhados', 40)
ON CONFLICT (slug) DO NOTHING;
