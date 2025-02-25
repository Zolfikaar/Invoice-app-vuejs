import{r as _,o as X,a as u,c as m,b as e,t as r,u as t,w as Z,_ as te,d as se,e as E,f as le,g as ne,h as N,n as D,i as b,j as v,v as y,k as me,F as W,l as oe,m as H,p as O,q as ve,s as ie,x as de,y as ye,z as he,A as K}from"./index-CeU9S4Z9.js";const fe={class:"delete_modal"},Ce=e("h2",null,"Confirm Change",-1),Ae={__name:"StatusModal",props:{invoice:{type:Object,required:!0}},emits:["onChange","close"],setup(f,{emit:M}){const V=M;let a=_({...f.invoice}),n=_();X(()=>{});const $=()=>{V("onChange",a.value)},k=()=>{V("close",n.value)};return(P,w)=>(u(),m("div",{class:"delete_modal_overlay",onClick:Z(k,["self"])},[e("div",fe,[Ce,e("p",null,"Are you sure you want to change invoice #"+r(t(a).id)+" status? This action cannot be undone.",1),e("div",{class:"btns"},[e("div",{class:"edit-btn",onClick:k},"Cancel"),e("div",{class:"delete-btn",onClick:$},"Confirm")])])]))}},c=f=>(ie("data-v-c5ae5155"),f=f(),de(),f),be={class:"edit_modal"},ge=c(()=>e("p",null,"Go back",-1)),$e=c(()=>e("span",null,"#",-1)),ke={class:"edit_modal_content_box"},De={class:"bill_from_group"},Ie=c(()=>e("p",{class:"group_header"},"Bill From",-1)),Ve={for:"st_address"},Ne={key:0,class:"error_msg"},Se={class:"other_info"},xe=c(()=>e("label",{for:"city"},"City",-1)),Ee=c(()=>e("label",{for:"postCode"},"Post Code ",-1)),we=c(()=>e("label",{for:"country"},"Country ",-1)),Ue={class:"bill_to_group"},Me={class:"main_info"},Pe=c(()=>e("p",{class:"group_header"},"Bill To",-1)),Te={for:"clientName"},qe={key:0,class:"error_msg"},Oe={for:"clientEmail"},Le={key:0,class:"error_msg"},Be={for:"streetAddress"},je={key:0,class:"error_msg"},Je={class:"other_info"},Qe=c(()=>e("label",{for:"city"},"City",-1)),Fe=c(()=>e("label",{for:"postCode"},"Post Code ",-1)),Ye=c(()=>e("label",{for:"country"},"Country ",-1)),ze={class:"dates_info"},Ge={class:"form_group invoice_date"},Re=c(()=>e("label",{for:"invoiceDate"},"Invoice Date",-1)),He={id:"invoiceDate",class:"invoiceDate"},Ke={class:"form_group payment_due"},We=c(()=>e("label",{for:"paymentDue"},"Payment Terms",-1)),Xe={key:0,class:"paymentTermBox"},Ze={for:"desc"},et={key:0,class:"error_msg"},tt={class:"invoice_items"},st=c(()=>e("p",{class:"list_title"},"Item List",-1)),lt={class:"item_table"},nt=c(()=>e("div",{class:"table_header"},[e("span",null,"Item Name"),e("span",{class:"qty_span"},"Qty."),e("span",null,"Price"),e("span",null,"Total")],-1)),ot={class:"table_body"},it={class:"item_info"},dt=c(()=>e("span",{class:"sm_label"},"Name",-1)),at=["onUpdate:modelValue"],rt=c(()=>e("span",{class:"qty_span sm_label"},"Qty.",-1)),ct=["onUpdate:modelValue","onInput"],ut=c(()=>e("span",{class:"sm_label"},"Price",-1)),_t=["onUpdate:modelValue","onInput"],pt=c(()=>e("span",{class:"sm_label"},"Total",-1)),mt={class:"item_total"},vt={class:"delete_btn"},yt={key:0,class:"item_info new_row"},ht=c(()=>e("span",{class:"sm_label"},"Name",-1)),ft=c(()=>e("span",{class:"qty_span sm_label"},"Qty.",-1)),Ct=c(()=>e("span",{class:"sm_label"},"Price",-1)),At=c(()=>e("span",{class:"sm_label"},"Total",-1)),bt={class:"item_total"},gt={class:"delete_btn",style:{visibility:"hidden",width:"54px"}},$t={key:1,class:"item_info new_row"},kt=c(()=>e("span",{class:"sm_label"},"Name",-1)),Dt=c(()=>e("span",{class:"qty_span sm_label"},"Qty.",-1)),It=c(()=>e("span",{class:"sm_label"},"Price",-1)),Vt=c(()=>e("span",{class:"sm_label"},"Total",-1)),Nt={class:"item_total"},St={class:"delete_btn",style:{visibility:"hidden",width:"54px"}},xt={class:"errors_box"},Et={key:0},wt={key:1},Ut={__name:"EditModal",props:{invoice:{type:Object,required:!0}},emits:["toggleEditModal","update-invoice"],setup(f,{emit:M}){const V=f,d=M,a=_({...V.invoice});let n=_({id:a.value.id,createdAt:a.value.createdAt,paymentDue:a.value.paymentDue,description:a.value.description,paymentTerms:a.value.paymentTerms,clientName:a.value.clientName,clientEmail:a.value.clientEmail,status:a.value.status,senderAddress:{street:a.value.senderAddress.street,city:a.value.senderAddress.city,postCode:a.value.senderAddress.postCode,country:a.value.senderAddress.country},clientAddress:{street:a.value.clientAddress.street,city:a.value.clientAddress.city,postCode:a.value.clientAddress.postCode,country:a.value.clientAddress.country},items:a.value.items,total:a.value.total}),$=_(!1);const k=()=>$.value=!$.value;let P=_(30);const w=i=>{P.value=i,$.value=!1,n.value.paymentTerms=i;let l=i,A=n.value.createdAt;if(A==null){let Q=function(R){return R<10?"0"+R:R},x=new Date,ue=x.getFullYear(),_e=Q(x.getMonth()+1),pe=Q(x.getDate());A=`${ue}-${_e}-${pe}`,n.value.createdAt=A}let s=parseInt(A.slice(8)),h=parseInt(A.slice(5,7)),Y=parseInt(A.slice(0,4)),z=null,G=((x,Q)=>new Date(x,Q,0).getDate())(Y,h);if(l+s>G){h++;let x=l+s-G;z=`${Y}-${h}-${x}`}else if(l+s<=G){let x=l+s;z=`${Y}-${h}-${x}`}n.value.paymentDue=z};let o=_({description:!1,clientName:!1,clientEmail:!1,senderAddressStreet:!1,senderAddressCity:!1,senderAddressPostCode:!1,senderAddressCountry:!1,clientAddressStreet:!1,clientAddressCity:!1,clientAddressPostCode:!1,clientAddressCountry:!1}),U=_(!0);function L(){const i=Object.values(o.value),l=i.every(s=>s===!0),A=i.every(s=>s===!1);l&&(U.value=!0),A&&(U.value=!1)}function T(i){i.description===""?o.value.description=!0:o.value.description=!1,i.clientEmail===""?o.value.clientEmail=!0:o.value.clientEmail=!1,i.clientName===""?o.value.clientName=!0:o.value.clientName=!1,i.items.length===0?S.value=!0:S.value=!1,i.senderAddress.street===""?o.value.senderAddressStreet=!0:o.value.senderAddressStreet=!1,i.senderAddress.city===""?o.value.senderAddressCity=!0:o.value.senderAddressCity=!1,i.senderAddress.country===""?o.value.senderAddressCountry=!0:o.value.senderAddressCountry=!1,i.senderAddress.postCode===""?o.value.senderAddressPostCode=!0:o.value.senderAddressPostCode=!1,i.clientAddress.street===""?o.value.clientAddressStreet=!0:o.value.clientAddressStreet=!1,i.clientAddress.city===""?o.value.clientAddressCity=!0:o.value.clientAddressCity=!1,i.clientAddress.country===""?o.value.clientAddressCountry=!0:o.value.clientAddressCountry=!1,i.clientAddress.postCode===""?o.value.clientAddressPostCode=!0:o.value.clientAddressPostCode=!1,L()}let j=0,g=_(),C=_(),p=_(),q=_(0),B=_([]),S=_(!0);function ae(){if(g.value!==void 0&&C.value!==void 0&&p.value!==void 0){j++;let i={id:j,name:g.value,quantity:C.value,price:p.value,total:C.value*p.value};return B.value.push(i),S.value=!1,g=_(),C=_(),p=_(),q=_(0),i}}const ee=i=>{let l=n.value.items.indexOf(i);n.value.items[l].total=i.qty*i.price},F=i=>{let l=n.value.items.indexOf(i),A=n.value.items[l];n.value.items.pop(A),B.value.pop(A)},re=()=>{let i=ae();i!==void 0&&(n.value.items.push(i),S.value=!1)},ce=()=>{if(T(n.value),!U.value&&!S.value){let i=0;n.value.items.forEach(h=>i+=h.total),n.value.total=i,n.value.status="pending";let l=JSON.parse(localStorage.getItem("invoices")),A=l.filter(h=>h.id==n.value.id),s=l.indexOf(A[0]);s>-1&&l.splice(s,1),l.push(n.value),localStorage.setItem("invoices",JSON.stringify(l)),d("update-invoice",!0),J()}},J=()=>d("toggleEditModal");return(i,l)=>{const A=se("router-link");return u(),m("div",{class:"edit_modal_overlay",onClick:Z(J,["self"])},[e("div",be,[E(A,{class:"sm_back_btn",onClick:J},{default:le(()=>[E(ne),ge]),_:1}),e("h2",null,[N("Edit "),$e,N(r(f.invoice.id),1)]),e("div",ke,[e("div",De,[Ie,e("div",{class:D(["form_group st_address",t(o).senderAddressStreet?"is_empty":""])},[e("label",Ve,[N("Street Address "),t(o).senderAddressStreet?(u(),m("span",Ne,"Can't be empty")):b("",!0)]),v(e("input",{type:"text",id:"st_address","onUpdate:modelValue":l[0]||(l[0]=s=>t(n).senderAddress.street=s)},null,512),[[y,t(n).senderAddress.street]])],2),e("div",Se,[e("div",{class:D(["form_group city",t(o).senderAddressCity?"is_empty":""])},[xe,v(e("input",{type:"text",id:"city","onUpdate:modelValue":l[1]||(l[1]=s=>t(n).senderAddress.city=s)},null,512),[[y,t(n).senderAddress.city]])],2),e("div",{class:D(["form_group postCode",t(o).senderAddressPostCode?"is_empty":""])},[Ee,v(e("input",{type:"text",id:"postCode","onUpdate:modelValue":l[2]||(l[2]=s=>t(n).senderAddress.postCode=s)},null,512),[[y,t(n).senderAddress.postCode]])],2),e("div",{class:D(["form_group country",t(o).senderAddressCountry?"is_empty":""])},[we,v(e("input",{type:"text",id:"country","onUpdate:modelValue":l[3]||(l[3]=s=>t(n).senderAddress.country=s)},null,512),[[y,t(n).senderAddress.country]])],2)])]),e("div",Ue,[e("div",Me,[Pe,e("div",{class:D(["form_group clientName",t(o).clientName?"is_empty":""])},[e("label",Te,[N("Client Name "),t(o).clientName?(u(),m("span",qe,"Can't be empty")):b("",!0)]),v(e("input",{type:"text",id:"clientName","onUpdate:modelValue":l[4]||(l[4]=s=>t(n).clientName=s)},null,512),[[y,t(n).clientName]])],2),e("div",{class:D(["form_group clientEmail",t(o).clientEmail?"is_empty":""])},[e("label",Oe,[N("Client Email "),t(o).clientEmail?(u(),m("span",Le,"Can't be empty")):b("",!0)]),v(e("input",{type:"text",id:"clientEmail","onUpdate:modelValue":l[5]||(l[5]=s=>t(n).clientEmail=s)},null,512),[[y,t(n).clientEmail]])],2),e("div",{class:D(["form_group streetAddress",t(o).clientName?"is_empty":""])},[e("label",Be,[N("Street Address "),t(o).clientAddressStreet?(u(),m("span",je,"Can't be empty")):b("",!0)]),v(e("input",{type:"text",id:"streetAddress","onUpdate:modelValue":l[6]||(l[6]=s=>t(n).clientAddress.street=s)},null,512),[[y,t(n).clientAddress.street]])],2)]),e("div",Je,[e("div",{class:D(["form_group city",t(o).clientAddressCity?"is_empty":""])},[Qe,v(e("input",{type:"text",id:"city","onUpdate:modelValue":l[7]||(l[7]=s=>t(n).clientAddress.city=s)},null,512),[[y,t(n).clientAddress.city]])],2),e("div",{class:D(["form_group postCode",t(o).clientAddressPostCode?"is_empty":""])},[Fe,v(e("input",{type:"text",id:"postCode","onUpdate:modelValue":l[8]||(l[8]=s=>t(n).clientAddress.postCode=s)},null,512),[[y,t(n).clientAddress.postCode]])],2),e("div",{class:D(["form_group country",t(o).clientAddressCountry?"is_empty":""])},[Ye,v(e("input",{type:"text",id:"country","onUpdate:modelValue":l[9]||(l[9]=s=>t(n).clientAddress.country=s)},null,512),[[y,t(n).clientAddress.country]])],2)]),e("div",ze,[e("div",Ge,[Re,e("div",He,[t(n).createdAt===null||t(n).createdAt?v((u(),m("input",{key:0,type:"date",id:"start","onUpdate:modelValue":l[10]||(l[10]=s=>t(n).createdAt=s),disabled:""},null,512)),[[y,t(n).createdAt]]):b("",!0)])]),e("div",Ke,[We,e("div",{class:"paymentDue",id:"paymentDue",onClick:k},[e("span",null,"Net "+r(t(P))+" Day"+r(t(P)==1?"":"s"),1),E(me)]),t($)?(u(),m("div",Xe,[e("span",{onClick:l[11]||(l[11]=s=>w(1))},"Net 1 Day"),e("span",{onClick:l[12]||(l[12]=s=>w(7))},"Net 7 Days"),e("span",{onClick:l[13]||(l[13]=s=>w(14))},"Net 14 Days"),e("span",{onClick:l[14]||(l[14]=s=>w(30))},"Net 30 Days")])):b("",!0)])]),e("div",{class:D(["form_group desc",t(o).description?"is_empty":""])},[e("label",Ze,[N("Project Description "),t(o).description?(u(),m("span",et,"Can't be empty")):b("",!0)]),v(e("input",{type:"text",id:"desc","onUpdate:modelValue":l[15]||(l[15]=s=>t(n).description=s)},null,512),[[y,t(n).description]])],2)]),e("div",tt,[st,e("div",lt,[nt,e("div",ot,[(u(!0),m(W,null,oe(t(n).items,s=>(u(),m("div",it,[dt,v(e("input",{type:"text",class:"item_name","onUpdate:modelValue":h=>s.name=h},null,8,at),[[y,s.name]]),rt,v(e("input",{type:"number",class:"item_qty","onUpdate:modelValue":h=>s.quantity=h,onInput:h=>ee(s)},null,40,ct),[[y,s.quantity]]),ut,v(e("input",{type:"number",class:"item_price","onUpdate:modelValue":h=>s.price=h,onInput:h=>ee(s)},null,40,_t),[[y,s.price]]),pt,e("div",mt,r(s.total),1),e("div",vt,[E(H,{onClick:h=>F(s)},null,8,["onClick"])])]))),256)),t(B).length===0?(u(),m("div",yt,[ht,v(e("input",{type:"text",class:"item_name","onUpdate:modelValue":l[16]||(l[16]=s=>O(g)?g.value=s:g=s)},null,512),[[y,t(g)]]),ft,v(e("input",{type:"number",class:"item_qty","onUpdate:modelValue":l[17]||(l[17]=s=>O(C)?C.value=s:C=s)},null,512),[[y,t(C)]]),Ct,v(e("input",{type:"number",class:"item_price","onUpdate:modelValue":l[18]||(l[18]=s=>O(p)?p.value=s:p=s)},null,512),[[y,t(p)]]),At,e("div",bt,r(t(C)*t(p)||t(q)),1),e("div",gt,[E(H,{onClick:l[19]||(l[19]=s=>F(i.item))})])])):(u(),m("div",$t,[kt,v(e("input",{type:"text",class:"item_name","onUpdate:modelValue":l[20]||(l[20]=s=>O(g)?g.value=s:g=s)},null,512),[[y,t(g)]]),Dt,v(e("input",{type:"number",class:"item_qty","onUpdate:modelValue":l[21]||(l[21]=s=>O(C)?C.value=s:C=s)},null,512),[[y,t(C)]]),It,v(e("input",{type:"number",class:"item_price","onUpdate:modelValue":l[22]||(l[22]=s=>O(p)?p.value=s:p=s)},null,512),[[y,t(p)]]),Vt,e("div",Nt,r(t(C)*t(p)||t(q)),1),e("div",St,[E(H,{onClick:l[23]||(l[23]=s=>F(i.item))})])]))]),e("div",{class:"add_new_item_btn",onClick:re},[E(ve),N(" Add New Item / Update Item ")]),e("div",xt,[t(U)?(u(),m("div",Et,"- All fields must be added")):b("",!0),t(n).items.length===0?(u(),m("div",wt,"- An item must be added")):b("",!0)])])])]),e("div",{class:"btns"},[e("div",{class:"edit-btn",onClick:J},"Cancel"),e("div",{class:"primary-btn",onClick:ce},"Save Changes")])])])}}},Mt=te(Ut,[["__scopeId","data-v-c5ae5155"]]),Pt={class:"delete_modal"},Tt=e("h2",null,"Confirm Deletion",-1),qt={__name:"DeleteModal",props:{invoice:{type:Object,required:!0}},emits:["onDelete","close"],setup(f,{emit:M}){const V=M;let a=_({...f.invoice}),n=_();X(()=>{});const $=()=>{V("onDelete",a.value)},k=()=>{V("close",n.value)};return(P,w)=>(u(),m("div",{class:"delete_modal_overlay",onClick:Z(k,["self"])},[e("div",Pt,[Tt,e("p",null,"Are you sure you want to delete invoice #"+r(t(a).id)+"? This action cannot be undone.",1),e("div",{class:"btns"},[e("div",{class:"edit-btn",onClick:k},"Cancel"),e("div",{class:"delete-btn",onClick:$},"Delete")])])]))}},I=f=>(ie("data-v-ed68dc3c"),f=f(),de(),f),Ot={key:3,class:"invoice__content"},Lt=I(()=>e("p",null,"Go back",-1)),Bt={class:"invoice__header"},jt={class:"left"},Jt=I(()=>e("p",null,"Status",-1)),Qt={class:"layer"},Ft=I(()=>e("span",null,null,-1)),Yt={class:"right"},zt={class:"content"},Gt={class:"top"},Rt={class:"left"},Ht={class:"invoice-id"},Kt=I(()=>e("span",null,"#",-1)),Wt={class:"right"},Xt={class:"middle"},Zt={class:"details"},es={class:"dates"},ts={class:"details__group invoice_date"},ss=I(()=>e("p",null,"Invoice Date",-1)),ls={class:"details__group payment_due"},ns=I(()=>e("p",null,"Payment Due",-1)),os={class:"bill_info"},is={class:"details__group client_name"},ds=I(()=>e("p",null,"Bill to",-1)),as={class:"details__group client_address"},rs={class:"details__group client_email"},cs=I(()=>e("p",null,"Client Email",-1)),us={class:"sm details__group client_email"},_s=I(()=>e("p",null,"Client Email",-1)),ps={class:"bottom"},ms={class:"items_table"},vs=I(()=>e("div",{class:"table_header"},[e("p",null,"Item Name"),e("p",null,"QTY."),e("p",null,"Price"),e("p",null,"Total")],-1)),ys={class:"table_body"},hs={class:"item_row"},fs={class:"name_and_qty_and_price"},Cs={class:"name"},As={class:"qty_and_price"},bs={class:"total"},gs={class:"table_footer"},$s=I(()=>e("p",null,"Amount Due",-1)),ks=I(()=>e("span",null,"$",-1)),Ds={class:"invoice_footer"},Is={__name:"ViewInvoice",props:{id:{type:String,required:!0}},setup(f){const M=ye(),V=f;let d=_(),a=JSON.parse(localStorage.getItem("invoices")),n=a.filter(p=>p.id==V.id)[0];X(()=>{d.value=he().getInvoice(V.id)[0]});let $=_(!1);const k=()=>{$.value=!$.value},P=()=>{k(),w(),M.push({name:"home"})},w=()=>{let p=a.indexOf(n);p>-1&&a.splice(p,1),localStorage.setItem("invoices",JSON.stringify(a))};let o=_(!1);const U=()=>{o.value=!o.value};let L=_(!1);const T=()=>{L.value=!L.value},j=()=>{T(),g()},g=()=>{n&&(n.status="paid",localStorage.setItem("invoices",JSON.stringify(a)),d.value.status="paid")},C=p=>{p&&(d.value=JSON.parse(localStorage.getItem("invoices")).filter(q=>q.id==V.id)[0])};return(p,q)=>{const B=se("router-link");return u(),m(W,null,[t(o)?(u(),K(Mt,{key:0,invoice:t(d),onToggleEditModal:U,onUpdateInvoice:C},null,8,["invoice"])):b("",!0),t($)?(u(),K(qt,{key:1,invoice:t(d),onOnDelete:P,onClose:k},null,8,["invoice"])):b("",!0),t(L)?(u(),K(Ae,{key:2,invoice:t(d),onOnChange:j,onClose:T},null,8,["invoice"])):b("",!0),t(d)?(u(),m("div",Ot,[E(B,{class:"back_btn",to:"/"},{default:le(()=>[E(ne),Lt]),_:1}),e("div",Bt,[e("div",jt,[Jt,e("div",{class:D(["invoice__status",t(d).status+"-btn"])},[e("div",Qt,[Ft,N(" "+r(t(d).status),1)])],2)]),e("div",Yt,[e("div",{class:"edit-btn",onClick:U},"Edit"),e("div",{class:"delete-btn",onClick:k},"Delete"),t(d).status==="pending"?(u(),m("div",{key:0,class:"primary-btn",onClick:T},"Mark as Paid")):b("",!0)])]),e("div",zt,[e("div",Gt,[e("div",Rt,[e("h3",Ht,[Kt,N(r(t(d).id),1)]),e("p",null,r(t(d).description),1)]),e("div",Wt,[e("p",null,r(t(d).senderAddress.street),1),e("p",null,r(t(d).senderAddress.city),1),e("p",null,r(t(d).senderAddress.postCode),1),e("p",null,r(t(d).senderAddress.country),1)])]),e("div",Xt,[e("div",Zt,[e("div",es,[e("div",ts,[ss,e("h3",null,r(t(d).createdAt),1)]),e("div",ls,[ns,e("h3",null,r(t(d).paymentDue),1)])]),e("div",os,[e("div",is,[ds,e("h3",null,r(t(d).clientName),1)]),e("div",as,[e("p",null,r(t(d).clientAddress.street),1),e("p",null,r(t(d).clientAddress.city),1),e("p",null,r(t(d).clientAddress.postCode),1),e("p",null,r(t(d).clientAddress.country),1)])]),e("div",rs,[cs,e("h3",null,r(t(d).clientEmail),1)])]),e("div",us,[_s,e("h3",null,r(t(d).clientEmail),1)])]),e("div",ps,[e("div",ms,[vs,e("div",ys,[(u(!0),m(W,null,oe(t(d).items,S=>(u(),m("div",hs,[e("div",fs,[e("div",Cs,[e("h4",null,r(S.name),1)]),e("div",As,[e("h4",null,r(S.quantity),1),e("h4",null,"$ "+r(S.price),1)])]),e("div",bs,[e("h4",null,"$ "+r(S.total),1)])]))),256))]),e("div",gs,[$s,e("h2",null,[ks,N(r(t(d).total),1)])])])])]),e("div",Ds,[e("div",{class:"edit-btn",onClick:U},"Edit"),e("div",{class:"delete-btn",onClick:k},"Delete"),t(d).status==="pending"?(u(),m("div",{key:0,class:"primary-btn",onClick:T},"Mark as Paid")):b("",!0)])])):b("",!0)],64)}}},xs=te(Is,[["__scopeId","data-v-ed68dc3c"]]);export{xs as default};
