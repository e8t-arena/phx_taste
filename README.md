## Setup

0. choose a branch

	main branch will keep up with phoenix/master

1. config elixir version (via asdf)

	asdf plugin add erlang

	asdf plugin add elixir

	ERLANG_VERSION=24.0.4

	asdf install erlang $ERLANG_VERSION

	asdf local erlang $ERLANG_VERSION

	ELIXIR_VERSION=1.12.2-otp-24

	asdf install elixir $ELIXIR_VERSION

	asdf local elixir $ELIXIR_VERSION

2. config mix archive path to ./archives

	. ./export_mix_archives

## Start App

### use default app

	created by installer of ``phoenix/master` ([installer](https://github.com/phoenixframework/phoenix/tree/master/installer))

	support esbuild, tailwindcss, fontawesome, sqlite3

	 npm i -prefix assets

### use installer from other branch

	cd phoenix/installer

	MIX_ENV=prod mix do archive.build, archive.install

	mix phx.new app --no-assets \
	--no-install
	--database sqlite3 \
	--live

## License

Copyright (c) 2021 Peter Lau.

esbuild source code is licensed under the [MIT License](LICENSE.md).


