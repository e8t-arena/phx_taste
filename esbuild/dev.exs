config :app, AppWeb.Endpoint,
  # Binding to loopback ipv4 address prevents access from other machines.
  # Change to `ip: {0, 0, 0, 0}` to allow access from other machines.
  # http: [ip: {127, 0, 0, 1}, port: 4000],
  http: [ip: {0, 0, 0, 0}, port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [
    # Start the esbuild watcher by calling Esbuild.install_and_run(:default, args)
    esbuild: {Esbuild, :install_and_run, [:default, ~w(--sourcemap=inline --watch)]},
    npx: [
      "tailwindcss",
      "--postcss",
      # "--watch",
      "--input=css/tailwind.css",
      # "--output=../priv/static/assets/app.css",
      "--output=css/_tailwind.css",
      cd: Path.expand("../assets", __DIR__)
    ],
    npx: [
      "sass",
      "-qw",
      "css/app.scss:../priv/static/assets/app.css",
      cd: Path.expand("../assets", __DIR__)
    ],
    cp: [
      "-r",
      "static/",
      "../assets/node_modules/@fortawesome/fontawesome-free/webfonts/",
      "../priv/static/assets/.",
      cd: Path.expand("../assets", __DIR__)
    ]
  ]
