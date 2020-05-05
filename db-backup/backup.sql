--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

-- Started on 2020-05-05 16:58:05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 206 (class 1259 OID 16452)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    text character varying,
    created_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16448)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO postgres;

--
-- TOC entry 2846 (class 0 OID 0)
-- Dependencies: 204
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 205 (class 1259 OID 16450)
-- Name: messages_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_user_id_seq OWNER TO postgres;

--
-- TOC entry 2847 (class 0 OID 0)
-- Dependencies: 205
-- Name: messages_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_user_id_seq OWNED BY public.messages.user_id;


--
-- TOC entry 203 (class 1259 OID 16438)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying NOT NULL,
    created_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16436)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 2848 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2699 (class 2604 OID 16455)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 2700 (class 2604 OID 16456)
-- Name: messages user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN user_id SET DEFAULT nextval('public.messages_user_id_seq'::regclass);


--
-- TOC entry 2697 (class 2604 OID 16441)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2840 (class 0 OID 16452)
-- Dependencies: 206
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, user_id, text, created_date) FROM stdin;
\.


--
-- TOC entry 2837 (class 0 OID 16438)
-- Dependencies: 203
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, created_date, password) FROM stdin;
180	john	2020-05-04 19:09:40.432745-05	$2b$10$xtK./TDN0WbdxwPotd0vC.VacKXgn8IrBxo9HFTW0Q8DzSI1DEr.S
181	rick	2020-05-04 21:09:37.338746-05	$2b$10$TzTaaUlHUjyVLodv1rct..RQVCz8heeKixhSmQjhH0Vlp1NxUYdMe
184	james	2020-05-04 21:19:46.154891-05	$2b$10$XsoTwRAWMHZ5wqVJ7yHTfeQ9K3KsBtGLF/H3I/NTvsSjbsPoHb3L6
185	gail	2020-05-04 21:21:24.422441-05	$2b$10$YQviyWiArQsN4Is14kVqxO/SOvfv1w4DQ3t8ZBTl0D432YRBW2WHW
186	laruen	2020-05-04 21:23:23.26267-05	$2b$10$MkKeh3j/nUcRlhnj8V4Z3.6OMxVg4Np4ZZfINvIvZ0flbbYm9TSe6
187	niki	2020-05-04 21:24:06.802455-05	$2b$10$hv89nKNe09GJjIdj4SxdgemTLWvONG76e.IGZ3uuIZuGkDg7w3IQO
189	meg	2020-05-04 21:24:44.552791-05	$2b$10$.wiVkTHSDdjmGzzzE3L.Heis73e6tinD6iKW1dvm5FwJi7DsLFcHW
190	tif	2020-05-04 21:25:21.295551-05	$2b$10$w1VdDxEb8//0jIRJFZXb1e1FpNNZLXdPPMUcN/5/qS7C6b2vdpEQy
191	bex	2020-05-04 21:26:02.637808-05	$2b$10$UvINbmn.OZ44eT0iEu65.eDyGXj0MpjYd4cimjs47Zp.mJ8qxD6La
192	rrr	2020-05-04 21:27:27.236199-05	$2b$10$qBbgpgPbC2wgehDrlxuNjeCuHEKsKx0BHHleExU6OwVzKM5bt8i5.
193	dd	2020-05-04 21:28:00.973087-05	$2b$10$5rBDgxNrRpGbI8/bw/haHuXN3ZaWdUXgQWwtJCcm/3JtUPoDYb8T2
194	denis	2020-05-04 21:32:00.795462-05	$2b$10$y3fj8ivT4QBI/j.BsaVTb.13adgAfa40yTBy7OsEnYPGjVLQQQvMe
195	GREE	2020-05-04 21:45:03.879015-05	$2b$10$6v80v8eOM0bRx8Gpo9v32O5Bq6x0lQLMy.Ra02B/FOsvQjRHv1u9O
196	dup	2020-05-05 10:10:19.245257-05	$2b$10$alCWXDeBSMTmOcX//CsmPOGAbkOkkiNk0A7shsL7jdQE/vi9jnnde
198	bloopl	2020-05-05 10:19:07.906951-05	$2b$10$boSILRuSG3h22UEJitjK/u/Rq0EX1ArMxoybjyWhC/QV2f5DG5c.S
199	blooplf	2020-05-05 10:20:14.25975-05	$2b$10$ydZJ3CgGfeyyh8RUVPLDtuP8z7Hxu7qKnQ1GpeJf/kpHoMYcAn6v.
200	blooplfs	2020-05-05 10:24:15.712512-05	$2b$10$DMI2ZVFMcZ70vVU3aQICxeOxwpw.5FSnFJq4S9kpfgojt6R16Euqy
201	blooplfsd	2020-05-05 10:33:50.062085-05	$2b$10$Xv9QWHELnFPzUiKZjk/E7u8bKSXW78H3eUw6A150Rq0bSKNR5Q8pu
202	blooplfsdx	2020-05-05 10:34:50.447907-05	$2b$10$ihEmiSj3EsUUOhzM5YAhi.zHgrKwe73fHtFJwuowadpbVSm9qPjge
203	abnbna	2020-05-05 10:36:44.518127-05	$2b$10$YR24U4taoRrdnWH7uaDn1OmxWTax3y7YDbZTSih9Zkc7OwdUh06yW
204	abnbnad	2020-05-05 10:39:34.253129-05	$2b$10$srNlSQpV.ec42i7bMbQxH.9KHh2.BB6DGihZZCsfjQMfe4FeRZJFG
205	abnbnada	2020-05-05 10:41:15.570547-05	$2b$10$Qs1qokUXYGBQFlYOqBThoe7j1g4B10INTQI5iNQlcWxCNfEUNEkXS
206	abnbnadad	2020-05-05 10:42:48.197816-05	$2b$10$EA3iTNg.8lGYPjdmOIvHI./fjxq94A6VcDSz/mfdL5rA29R7HWQHm
207	abnbnadaddd	2020-05-05 10:47:03.434268-05	$2b$10$3xmbrlintQp6Gdro3ze8ZuMb6E9srw42owMn1Irva4r9O/7USq5ea
208	abnbnadadddll	2020-05-05 10:57:20.177312-05	$2b$10$QNjGkORpCzKYpV0iCdkswOv8VIFngjusPBGY5sMbAUtn6GQJSISV6
\.


--
-- TOC entry 2849 (class 0 OID 0)
-- Dependencies: 204
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 102, true);


--
-- TOC entry 2850 (class 0 OID 0)
-- Dependencies: 205
-- Name: messages_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_user_id_seq', 1, false);


--
-- TOC entry 2851 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 209, true);


--
-- TOC entry 2708 (class 2606 OID 16461)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 2703 (class 2606 OID 16486)
-- Name: users unique_username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- TOC entry 2705 (class 2606 OID 16446)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2706 (class 1259 OID 16468)
-- Name: fki_user_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_user_id_fk ON public.messages USING btree (user_id);


--
-- TOC entry 2709 (class 2606 OID 16463)
-- Name: messages user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 2852 (class 0 OID 0)
-- Dependencies: 2709
-- Name: CONSTRAINT user_id_fk ON messages; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON CONSTRAINT user_id_fk ON public.messages IS 'references users table id of user';


-- Completed on 2020-05-05 16:58:05

--
-- PostgreSQL database dump complete
--

