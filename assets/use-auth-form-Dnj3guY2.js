import{c as p,r as g,j as i,z as s,s as w,t as b}from"./index-eQP3t85S.js";import{u as x}from"./use-auth-C63Qx4Ns.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],F=p("eye-off",y),z="data:image/svg+xml,%3csvg%20enable-background='new%200%200%2048%2048'%20height='48'%20viewBox='0%200%2048%2048'%20width='48'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m43.611%2020.083h-1.611v-.083h-18v8h11.303c-1.649%204.657-6.08%208-11.303%208-6.627%200-12-5.373-12-12s5.373-12%2012-12c3.059%200%205.842%201.154%207.961%203.039l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382-11.045%200-20%208.955-20%2020s8.955%2020%2020%2020%2020-8.955%2020-20c0-1.341-.138-2.65-.389-3.917z'%20fill='%23ffc107'/%3e%3cpath%20d='m6.306%2014.691%206.571%204.819c1.778-4.402%206.084-7.51%2011.123-7.51%203.059%200%205.842%201.154%207.961%203.039l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382-7.682%200-14.344%204.337-17.694%2010.691z'%20fill='%23ff3d00'/%3e%3cpath%20d='m24%2044c5.166%200%209.86-1.977%2013.409-5.192l-6.19-5.238c-2.008%201.521-4.504%202.43-7.219%202.43-5.202%200-9.619-3.317-11.283-7.946l-6.522%205.025c3.31%206.477%2010.032%2010.921%2017.805%2010.921z'%20fill='%234caf50'/%3e%3cpath%20d='m43.611%2020.083h-1.611v-.083h-18v8h11.303c-.792%202.237-2.231%204.166-4.087%205.571.001-.001.002-.001.003-.002l6.19%205.238c-.438.398%206.591-4.807%206.591-14.807%200-1.341-.138-2.65-.389-3.917z'%20fill='%231976d2'/%3e%3c/svg%3e";function I({type:e="text",name:a,label:t,value:o,onChange:l,required:r=!1,className:c="",...n}){const[m,d]=g.useState(!1),u=()=>d(!0),h=f=>{f.target.value||d(!1)};return i.jsxs("div",{className:`relative pt-5 w-full ${c}`,children:[i.jsx("input",{type:e,name:a,id:a,value:o,onChange:l,onFocus:u,onBlur:h,required:r,placeholder:" ",className:`
          w-full 
          border-b-2 
          border-secondary-black
          bg-transparent 
          py-2 
          text-primary-black
          outline-none 
          transition-all 
          duration-200
          placeholder:text-transparent
          focus:border-b-3
          focus:border-primary-yellow
          focus:font-medium
        `,...n}),i.jsx("label",{htmlFor:a,className:`
          pointer-events-none 
          absolute 
          left-0 
          transition-all 
          duration-200
          ${m||o?"top-0 text-sm font-medium text-primary-yellow":"top-5 text-base text-secondary-black"}
        `,children:t})]})}const v=s.object({email:s.string().email("Please enter a valid email address"),password:s.string().min(6,"Password must be at least 6 characters long")}),P=s.object({email:s.string().email("Please enter a valid email address"),password:s.string().min(6,"Password must be at least 6 characters long"),confirmPassword:s.string().min(6,"Confirm password must be at least 6 characters long"),role:s.number().optional()}).refine(e=>e.password===e.confirmPassword,{message:"Passwords don't match",path:["confirmPassword"]}),j={loginSchema:v,registerSchema:P},M=({type:e})=>{const{loginMutation:a,registerMutation:t}=x(),{loginSchema:o,registerSchema:l}=j,r=w({resolver:b(e==="login"?o:l),defaultValues:e==="login"?{email:"",password:""}:{email:"",password:"",confirmPassword:"",role:0}}),c=r.handleSubmit(async n=>{e==="login"?await a.mutateAsync(n):await t.mutateAsync(n)});return{form:r,onSubmit:c,isLoading:a.isPending||t.isPending}};export{F as E,z as G,I,M as u};
