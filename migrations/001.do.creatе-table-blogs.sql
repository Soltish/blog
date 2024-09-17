CREATE TABLE blogs (
    id bigserial PRIMARY KEY UNIQUE NOT NULL,
    slug varchar(255) UNIQUE NOT NULL,
    title varchar(255) UNIQUE NOT NULL,
    description varchar(255) NOT NULL,
    body text NOT NULL,
    created_at timestamp NOT NULL
);
