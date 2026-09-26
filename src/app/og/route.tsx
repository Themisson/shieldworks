import { ImageResponse } from "next/og";

export async function GET(request:Request) {
  const title=(new URL(request.url).searchParams.get("title")||"Engenharia, pesquisa e software.").slice(0,180);
  return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",background:"#102e36",color:"#f1f6f3",padding:"64px",justifyContent:"space-between"}}><div style={{display:"flex",fontSize:28,letterSpacing:3}}>SHIELDWORKS / CONHECIMENTO EM APLICAÇÃO</div><div style={{display:"flex",fontSize:title.length>100?48:64,lineHeight:1.15,maxWidth:1050}}>{title}</div><div style={{display:"flex",fontSize:24,color:"#9ee4b9",borderTop:"1px solid #6c9894",paddingTop:24}}>ENGENHARIA / PESQUISA / SOFTWARE / SEGURANÇA</div></div>,{width:1200,height:630,headers:{"Cache-Control":"public, max-age=86400"}});
}
