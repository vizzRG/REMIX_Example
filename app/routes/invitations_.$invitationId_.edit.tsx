import {
  redirect,
  type ActionArgs,
  type LinksFunction,
  type LoaderArgs,
  type LoaderFunction,
} from "@remix-run/node";
import { Form, Link, useLoaderData, useRouteError,useNavigate } from "@remix-run/react";
import { getInvitations } from "~/data.server";
import stylesheet from "~/style/update.css";
import { updateInvitation } from "~/data.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesheet }];
};

export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
  const invitations = getInvitations();
  const invitation = (await invitations).find(
    (id) => id.id === params.invitationId
  );
  if (!invitation) {
    throw new Response("Not Found", { status: 404 });
  }
  return invitation;
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const data = {
    id: updates.id.toString(),
    email: updates.email.toString(),
    sentTime: Date.now(),
  };

  await updateInvitation(data);
  return redirect("/");
};

export default function edit() {
  const navigate = useNavigate();
  const { id, email, sentTime } = useLoaderData<typeof loader>();
  return (
    <Form method="POST">
      <Link id="home" to={"/"}>Go to home</Link>
      <label htmlFor="id">id</label>
      <input type="text" id="id" name="id" defaultValue={id} readOnly />
      <label htmlFor="email">email</label>
      <input type="email" id="email" name="email" defaultValue={email} />
      <label htmlFor="time">Time</label>
      <input
        type="number"
        id="time"
        name="time"
        defaultValue={sentTime}
        readOnly
      />
      <button type="submit" name="intent" value="update">
        Update
      </button>
      <button onClick={()=>navigate(-1)} type="button" id="cancel">Cancel</button>
    </Form>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return <h1 style={{ color: "red" }}>Invalid Route!!!!</h1>;
}
