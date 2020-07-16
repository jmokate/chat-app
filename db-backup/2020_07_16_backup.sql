PGDMP                         x           chat_app    12.3    12.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    16402    chat_app    DATABASE     �   CREATE DATABASE chat_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE chat_app;
                postgres    false            �            1259    16452    messages    TABLE     �   CREATE TABLE public.messages (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    text character varying,
    created_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.messages;
       public         heap    postgres    false            �            1259    16448    messages_id_seq    SEQUENCE     x   CREATE SEQUENCE public.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.messages_id_seq;
       public          postgres    false    206            !           0    0    messages_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;
          public          postgres    false    204            �            1259    16450    messages_user_id_seq    SEQUENCE     }   CREATE SEQUENCE public.messages_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.messages_user_id_seq;
       public          postgres    false    206            "           0    0    messages_user_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.messages_user_id_seq OWNED BY public.messages.user_id;
          public          postgres    false    205            �            1259    16438    users    TABLE     J  CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying NOT NULL,
    created_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    password character varying NOT NULL,
    last_active_at timestamp with time zone DEFAULT now() NOT NULL,
    is_logged_in boolean DEFAULT true NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16436    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    203            #           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    202            �
           2604    16455    messages id    DEFAULT     j   ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);
 :   ALTER TABLE public.messages ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    206    206            �
           2604    16456    messages user_id    DEFAULT     t   ALTER TABLE ONLY public.messages ALTER COLUMN user_id SET DEFAULT nextval('public.messages_user_id_seq'::regclass);
 ?   ALTER TABLE public.messages ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    205    206    206            �
           2604    16441    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203                      0    16452    messages 
   TABLE DATA           C   COPY public.messages (id, user_id, text, created_date) FROM stdin;
    public          postgres    false    206   �                 0    16438    users 
   TABLE DATA           c   COPY public.users (id, username, created_date, password, last_active_at, is_logged_in) FROM stdin;
    public          postgres    false    203   �       $           0    0    messages_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.messages_id_seq', 1, true);
          public          postgres    false    204            %           0    0    messages_user_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.messages_user_id_seq', 1, false);
          public          postgres    false    205            &           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    202            �
           2606    16461    messages messages_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    206            �
           2606    16486    users unique_username 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_username UNIQUE (username);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT unique_username;
       public            postgres    false    203            �
           2606    16446    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    203            �
           1259    16468    fki_user_id_fk    INDEX     F   CREATE INDEX fki_user_id_fk ON public.messages USING btree (user_id);
 "   DROP INDEX public.fki_user_id_fk;
       public            postgres    false    206            �
           2606    16463    messages user_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 =   ALTER TABLE ONLY public.messages DROP CONSTRAINT user_id_fk;
       public          postgres    false    2707    203    206            '           0    0 !   CONSTRAINT user_id_fk ON messages    COMMENT     \   COMMENT ON CONSTRAINT user_id_fk ON public.messages IS 'references users table id of user';
          public          postgres    false    2711                  x������ � �            x������ � �     