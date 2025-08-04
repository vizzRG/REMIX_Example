import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation
} from "@remix-run/react";
import stylesheet from "~/style/root.css"

export const links:LinksFunction = ()=>{
  return [
    {rel: "stylesheet", href: stylesheet}
  ]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Invitation App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const navigation = useNavigation()
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className={navigation.state === "loading" ? "loading" : ""}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
