## Setup

### choose a branch

main branch will keep up with phoenix/master

	git submodule update --init --recursive

### config elixir version (via asdf)

	asdf plugin add erlang

	asdf plugin add elixir

	ERLANG_VERSION=24.0.4

	asdf install erlang $ERLANG_VERSION

	asdf local erlang $ERLANG_VERSION

	ELIXIR_VERSION=1.12.2-otp-24

	asdf install elixir $ELIXIR_VERSION

	asdf local elixir $ELIXIR_VERSION

### config mix archive path to ./archives

	. ./export_mix_archives

## Start App

### use default app

created by installer of `phoenix/master` [installer](https://github.com/phoenixframework/phoenix/tree/master/installer)

support esbuild, alpine.js, tailwindcss, fontawesome, sqlite3

	 yarn --cwd assets (OR npm i --prefix assets)

### use installer from other branch

	cd phoenix/installer

	MIX_ENV=prod mix do archive.build, archive.install

	mix archive

	mix phx.new app --no-assets \
	--no-install \
	--database sqlite3 \
	--live

	# modify mix.exs

add in deps

  	{:esbuild, "~> 0.1", runtime: Mix.env() == :dev},

	# {:phoenix, github: "phoenixframework/phoenix", override: true},

  	{:phoenix, path: "../phoenix", override: true},

	mix deps.get

	yarn --cwd assets (OR npm i --prefix assets)

add css, js in assets

add config in esbuild to config/config.exs and config/dev.exs

change static path in app/lib/app_web/templates/layout/root.html.leex

	<%= Routes.static_path(@conn, "/assets/app.js") %>

## License

Copyright (c) 2021 Peter Lau.

esbuild source code is licensed under the [MIT License](LICENSE.md).


