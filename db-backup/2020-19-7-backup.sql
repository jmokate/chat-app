CREATE TABLE public.messages (
    id serial PRIMARY KEY,
    user_id bigint NOT NULL,
    text character varying,
    created_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.users (
    id serial PRIMARY KEY,
    username character varying NOT NULL,
    created_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    password character varying NOT NULL,
    last_active_at timestamp with time zone DEFAULT now() NOT NULL,
    is_logged_in boolean DEFAULT true NOT NULL
);