import type{ LinksFunction, LoaderArgs } from "@remix-run/node";
import { getInvitations } from "~/data.server";
import { useLoaderData, useRouteError } from "@remix-run/react";
import stylesheet from "~/style/invitations.css"
import { Link } from "@remix-run/react";
export async function loader({params} : LoaderArgs){
    const invitations = getInvitations()
    const invitation = (await invitations).find((invitation)=> invitation.id === params.invitationId)
//     if (!invitation) {
//     throw new Response("Not Found", { status: 404,message : "Not Found" });
//   }
    return invitation;  

}

export const links: LinksFunction = ()=>{
  return [
  {rel: "stylesheet", href : stylesheet},
]}

export default function invite(){

    const data = useLoaderData<typeof loader>()
    const time = new Date(data.sentTime).toLocaleTimeString()
    console.log(time)
    return(
        <div className="details">
            <Link to={"/"} id="home">Go back to home</Link>
            <h1>Id : <span className="deatil">{data.id}</span></h1>
            <h2>Email : <span className="deatil">{data.email}</span></h2>
            <h3>Time : <span className="deatil">{time}</span></h3>
        </div>
    )
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <h1 style={{color : "red"}}>Invalid Route!!!!</h1>
  );
}
