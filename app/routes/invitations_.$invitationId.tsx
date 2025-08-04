import type{ LinksFunction, LoaderArgs } from "@remix-run/node";
import { getInvitations } from "~/data.server";
import { useLoaderData } from "@remix-run/react";
import stylesheet from "~/style/invitations.css"

export async function loader({params} : LoaderArgs){
    const invitations = getInvitations()
    const invitation = (await invitations).find((invitation)=> invitation.id === params.invitationId )
    return invitation;  

}

export const links: LinksFunction = ()=>{
  return [
  {rel: "stylesheet", href : stylesheet},
]}

export default function invite(){

    const data = useLoaderData<typeof loader>()
    return(
        <div className="details">
            <h1>Id : <span className="deatil">{data.id}</span></h1>
            <h2>Email : <span className="deatil">{data.email}</span></h2>
            <h3>Time : <span className="deatil">{data.sentTime}</span></h3>
        </div>
    )



}