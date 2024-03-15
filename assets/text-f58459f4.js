import{b as M,u as q,A as E,_ as k,w as j,R as ue,i as ce,f as P,m as de,O as G,a5 as R,a3 as pe,k as me,E as A,a6 as fe,e as ge,a2 as ye,a7 as ve}from"./base-bb3a9cd4.js";import{g as Ce,d as he,W as be}from"./input-0dfebaa5.js";import{d as C,l as d,b as p,c as B,j as I,f as L,w as T,z as J,e as z,I as m,k as o,J as K,A as W,T as X,i as y,N as Q,L as Y,ac as Te,r as x,o as Se,q as _e,M as _,F as we,X as Ne,y as U,ab as ee,a1 as $,a6 as V}from"./index-7c7dea94.js";import{E as xe}from"./aria-60e0cdc6.js";const Z={},Ee=M({value:{type:[String,Number],default:""},max:{type:Number,default:99},isDot:Boolean,hidden:Boolean,type:{type:String,values:["primary","success","warning","info","danger"],default:"danger"},showZero:{type:Boolean,default:!0}}),Be=["textContent"],ze=C({name:"ElBadge"}),$e=C({...ze,props:Ee,setup(s,{expose:t}){const e=s,n=q("badge"),a=d(()=>e.isDot?"":E(e.value)&&E(e.max)?e.max<e.value?`${e.max}+`:e.value===0&&!e.showZero?"":`${e.value}`:`${e.value}`);return t({content:a}),(l,u)=>(p(),B("div",{class:m(o(n).b())},[I(l.$slots,"default"),L(X,{name:`${o(n).namespace.value}-zoom-in-center`,persisted:""},{default:T(()=>[J(z("sup",{class:m([o(n).e("content"),o(n).em("content",l.type),o(n).is("fixed",!!l.$slots.default),o(n).is("dot",l.isDot)]),textContent:K(o(a))},null,10,Be),[[W,!l.hidden&&(o(a)||l.isDot)]])]),_:1},8,["name"])],2))}});var Me=k($e,[["__file","badge.vue"]]);const ke=j(Me),Ie=M({type:{type:String,values:["primary","success","info","warning","danger",""],default:""},size:{type:String,values:Ce,default:""},truncated:{type:Boolean},lineClamp:{type:[String,Number]},tag:{type:String,default:"span"}}),Le=C({name:"ElText"}),Oe=C({...Le,props:Ie,setup(s){const t=s,e=he(),n=q("text"),a=d(()=>[n.b(),n.m(t.type),n.m(e.value),n.is("truncated",t.truncated),n.is("line-clamp",!ue(t.lineClamp))]);return(l,u)=>(p(),y(Y(l.tag),{class:m(o(a)),style:Q({"-webkit-line-clamp":l.lineClamp})},{default:T(()=>[I(l.$slots,"default")]),_:3},8,["class","style"]))}});var De=k(Oe,[["__file","text.vue"]]);const ts=j(De),se=["success","info","warning","error"],i=de({customClass:"",center:!1,dangerouslyUseHTMLString:!1,duration:3e3,icon:void 0,id:"",message:"",onClose:void 0,showClose:!1,type:"info",offset:16,zIndex:0,grouping:!1,repeatNum:1,appendTo:G?document.body:void 0}),Fe=M({customClass:{type:String,default:i.customClass},center:{type:Boolean,default:i.center},dangerouslyUseHTMLString:{type:Boolean,default:i.dangerouslyUseHTMLString},duration:{type:Number,default:i.duration},icon:{type:ce,default:i.icon},id:{type:String,default:i.id},message:{type:P([String,Object,Function]),default:i.message},onClose:{type:P(Function),required:!1},showClose:{type:Boolean,default:i.showClose},type:{type:String,values:se,default:i.type},offset:{type:Number,default:i.offset},zIndex:{type:Number,default:i.zIndex},grouping:{type:Boolean,default:i.grouping},repeatNum:{type:Number,default:i.repeatNum}}),He={destroy:()=>!0},c=Te([]),Pe=s=>{const t=c.findIndex(a=>a.id===s),e=c[t];let n;return t>0&&(n=c[t-1]),{current:e,prev:n}},Re=s=>{const{prev:t}=Pe(s);return t?t.vm.exposed.bottom.value:0},Ae=(s,t)=>c.findIndex(n=>n.id===s)>0?16:t,Ue=["id"],Ve=["innerHTML"],Ze=C({name:"ElMessage"}),qe=C({...Ze,props:Fe,emits:He,setup(s,{expose:t}){const e=s,{Close:n}=fe,{ns:a,zIndex:l}=be("message"),{currentZIndex:u,nextZIndex:f}=l,g=x(),h=x(!1),b=x(0);let w;const ne=d(()=>e.type?e.type==="error"?"danger":e.type:"info"),oe=d(()=>{const r=e.type;return{[a.bm("icon",r)]:r&&R[r]}}),O=d(()=>e.icon||R[e.type]||""),ae=d(()=>Re(e.id)),D=d(()=>Ae(e.id,e.offset)+ae.value),re=d(()=>b.value+D.value),le=d(()=>({top:`${D.value}px`,zIndex:u.value}));function N(){e.duration!==0&&({stop:w}=ge(()=>{S()},e.duration))}function F(){w==null||w()}function S(){h.value=!1}function ie({code:r}){r===xe.esc&&S()}return Se(()=>{N(),f(),h.value=!0}),_e(()=>e.repeatNum,()=>{F(),N()}),pe(document,"keydown",ie),me(g,()=>{b.value=g.value.getBoundingClientRect().height}),t({visible:h,bottom:re,close:S}),(r,H)=>(p(),y(X,{name:o(a).b("fade"),onBeforeLeave:r.onClose,onAfterLeave:H[0]||(H[0]=Xe=>r.$emit("destroy")),persisted:""},{default:T(()=>[J(z("div",{id:r.id,ref_key:"messageRef",ref:g,class:m([o(a).b(),{[o(a).m(r.type)]:r.type},o(a).is("center",r.center),o(a).is("closable",r.showClose),r.customClass]),style:Q(o(le)),role:"alert",onMouseenter:F,onMouseleave:N},[r.repeatNum>1?(p(),y(o(ke),{key:0,value:r.repeatNum,type:o(ne),class:m(o(a).e("badge"))},null,8,["value","type","class"])):_("v-if",!0),o(O)?(p(),y(o(A),{key:1,class:m([o(a).e("icon"),o(oe)])},{default:T(()=>[(p(),y(Y(o(O))))]),_:1},8,["class"])):_("v-if",!0),I(r.$slots,"default",{},()=>[r.dangerouslyUseHTMLString?(p(),B(we,{key:1},[_(" Caution here, message could've been compromised, never use user's input as message "),z("p",{class:m(o(a).e("content")),innerHTML:r.message},null,10,Ve)],2112)):(p(),B("p",{key:0,class:m(o(a).e("content"))},K(r.message),3))]),r.showClose?(p(),y(o(A),{key:2,class:m(o(a).e("closeBtn")),onClick:Ne(S,["stop"])},{default:T(()=>[L(o(n))]),_:1},8,["class","onClick"])):_("v-if",!0)],46,Ue),[[W,h.value]])]),_:3},8,["name","onBeforeLeave"]))}});var je=k(qe,[["__file","message.vue"]]);let Ge=1;const te=s=>{const t=!s||U(s)||ee(s)||$(s)?{message:s}:s,e={...i,...t};if(!e.appendTo)e.appendTo=document.body;else if(U(e.appendTo)){let n=document.querySelector(e.appendTo);ye(n)||(n=document.body),e.appendTo=n}return e},Je=s=>{const t=c.indexOf(s);if(t===-1)return;c.splice(t,1);const{handler:e}=s;e.close()},Ke=({appendTo:s,...t},e)=>{const n=`message_${Ge++}`,a=t.onClose,l=document.createElement("div"),u={...t,id:n,onClose:()=>{a==null||a(),Je(b)},onDestroy:()=>{V(null,l)}},f=L(je,u,$(u.message)||ee(u.message)?{default:$(u.message)?u.message:()=>u.message}:null);f.appContext=e||v._context,V(f,l),s.appendChild(l.firstElementChild);const g=f.component,b={id:n,vnode:f,vm:g,handler:{close:()=>{g.exposed.visible.value=!1}},props:f.component.props};return b},v=(s={},t)=>{if(!G)return{close:()=>{}};if(E(Z.max)&&c.length>=Z.max)return{close:()=>{}};const e=te(s);if(e.grouping&&c.length){const a=c.find(({vnode:l})=>{var u;return((u=l.props)==null?void 0:u.message)===e.message});if(a)return a.props.repeatNum+=1,a.props.type=e.type,a.handler}const n=Ke(e,t);return c.push(n),n.handler};se.forEach(s=>{v[s]=(t={},e)=>{const n=te(t);return v({...n,type:s},e)}});function We(s){for(const t of c)(!s||s===t.props.type)&&t.handler.close()}v.closeAll=We;v._context=null;const ns=ve(v,"$message");export{ns as E,ts as a};
