import"./base-bb3a9cd4.js";import{c as i,a as f,b as p}from"./input-0dfebaa5.js";import{E as _}from"./date-picker-844a3b3d.js";import"./scrollbar-cd73b27d.js";import"./popper-f3ef1ed3.js";import{r as g,b as D,i as v,w as a,f as l,g as F}from"./index-7c7dea94.js";import"./aria-60e0cdc6.js";const P={__name:"test",setup(b){const t=g({date:null}),m={date:[{required:!0,message:"Please select a date",trigger:"change"},{validator:(s,e,o)=>{new Date(e)<=new Date?o(new Error("Please select a future date")):o()},trigger:"change"}]},u=()=>{$refs.loginForm.validate(e=>{e?console.log("Form submitted successfully:",t.value):console.log("Form validation failed")})};return(s,e)=>{const o=_,r=f,n=p,c=i;return D(),v(c,{model:t.value,rules:m,ref:"loginForm"},{default:a(()=>[l(r,{label:"Date",prop:"date"},{default:a(()=>[l(o,{modelValue:t.value.date,"onUpdate:modelValue":e[0]||(e[0]=d=>t.value.date=d),type:"date",placeholder:"Select date"},null,8,["modelValue"])]),_:1}),l(r,null,{default:a(()=>[l(n,{type:"primary",onClick:u},{default:a(()=>[F("Submit")]),_:1})]),_:1})]),_:1},8,["model"])}}};export{P as default};
