CREATE TYPE public.app_role AS ENUM ('admin');
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.feiras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dia text NOT NULL DEFAULT '',
  nome text NOT NULL DEFAULT '',
  horario text NOT NULL DEFAULT '',
  local text NOT NULL DEFAULT '',
  ordem int NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.feiras TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.feiras TO authenticated;
GRANT ALL ON public.feiras TO service_role;
ALTER TABLE public.feiras ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read active" ON public.feiras FOR SELECT TO anon, authenticated USING (ativo OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin write" ON public.feiras FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.produtos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL DEFAULT '',
  descricao text NOT NULL DEFAULT '',
  tag text NOT NULL DEFAULT '',
  imagem text NOT NULL DEFAULT '',
  ordem int NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.produtos TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.produtos TO authenticated;
GRANT ALL ON public.produtos TO service_role;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read active" ON public.produtos FOR SELECT TO anon, authenticated USING (ativo OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin write" ON public.produtos FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.site_config (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  hero_titulo text NOT NULL DEFAULT '',
  hero_subtitulo text NOT NULL DEFAULT '',
  whatsapp text NOT NULL DEFAULT '',
  instagram text NOT NULL DEFAULT '',
  endereco text NOT NULL DEFAULT '',
  aviso text NOT NULL DEFAULT ''
);
GRANT SELECT ON public.site_config TO anon, authenticated;
GRANT UPDATE ON public.site_config TO authenticated;
GRANT ALL ON public.site_config TO service_role;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON public.site_config FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin update" ON public.site_config FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

INSERT INTO public.site_config (id, hero_titulo, hero_subtitulo, whatsapp, instagram, endereco, aviso) VALUES
(1, 'O sabor da alta panificação artesanal, da nossa bancada direto para a sua mesa.',
 'Pães de fermentação natural, folhados e receitas autorais feitos à mão. Encontre-nos nas melhores feiras da região ou garanta sua fornada sob encomenda.',
 '5551982356921', 'coelhodockhorn', 'Harmonia, Canoas - RS', '');

INSERT INTO public.feiras (dia, nome, horario, local, ordem) VALUES
('Quarta-feira','Feira Gastronômica Harmonia','14h às 19h','Bairro Harmonia, Canoas/RS',1),
('Sábado','Feira do Produtor & Artesanato','08h às 13h','Centro / Região Metropolitana',2),
('Domingo','Eventos & Feiras Especiais','09h às 15h','Confira o local atualizado no Instagram',3);

INSERT INTO public.produtos (nome, descricao, tag, imagem, ordem) VALUES
('Sourdough Tradicional','Farinha nobre, água e sal. Fermentação natural de 36 horas para casca crocante e miolo aerado.','Fornada Limitada','builtin:sourdough',1),
('Rústico de Cebola Roxa & Ervas','Massa de levain recheada com cebola roxa caramelizada e ervas frescas do dia.','Fornada Limitada','builtin:rustic',2),
('Trança de Brioche','Amanteigada e macia, com manteiga pura e ovos caipiras. Dourada no ponto certo.','Sob Encomenda','builtin:brioche',3),
('Folhados Artesanais','Croissants e folhados laminados à mão, em camadas finas de manteiga francesa.','Sob Encomenda','builtin:folhados',4);

CREATE POLICY "site read" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'site');
CREATE POLICY "site admin insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "site admin update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "site admin delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site' AND public.has_role(auth.uid(),'admin'));