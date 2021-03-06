var e=new RegExp([/(?<comment>;;.*|\(;[^]*?;\))/,/"(?<string>(?:\\"|[^"])*?)"/,/(?<param>offset|align|shared|funcref)=?/,/(?<hex>([+-]?nan:)?[+-]?0x[0-9a-f.p+-_]+)/,/(?<number>[+-]?inf|[+-]?nan|[+-]?\d[\d.e_+-]*)/,/(?<instr>[a-z][a-z0-9!#$%&'*+\-./:<=>?@\\^_`|~]+)/,/\$(?<label>[a-z0-9!#$%&'*+\-./:<=>?@\\^_`|~]+)/,/(?<lparen>\()|(?<rparen>\))|(?<nul>[ \t\n]+)|(?<error>.)/].map((e=>e.toString().slice(1,-1))).join("|"),"gi");function t(t){let n={},r={};const a=t.matchAll(e);function i(){const e=a.next();if(e.done)return{value:{value:null,kind:"eof",index:t.length},done:!0};const[n,r]=Object.entries(e.value.groups).filter((e=>null!=e[1]))[0];return{value:{value:r,kind:n,index:e.value.index},done:!1}}function s(){n=r;do{r=i().value}while("nul"===r.kind||"comment"===r.kind);return n}function l(e,t){if(e===r.kind){if(null==t)return s();if(t===r.value)return s()}return null}return{[Symbol.iterator](){return this},next:i,advance:s,peek:function(e,t){return null!=e?null!=t?t===r.value:e===r.kind:r},accept:l,expect:function(e,t){const n=l(e,t);if(!n)throw new SyntaxError("Unexpected token: "+r.value+"\n        expected: "+e+(t?' "'+t+'"':"")+"\n    but received: "+r.kind+"\n     at position: "+r.index);return n},start:s}}function n({start:e,peek:t,accept:n,expect:r}){const a=new TextEncoder("utf-8");function i(){const e=[];for(;;){const t=n("string");if(!t)break;if("\\"===t.value[0]&&t.value[1].match(/[0-9a-f]/i)){const n=t.value.matchAll(/\\([0-9a-f]{1,2})/gi);for(const t of n)e.push(parseInt(t[1],16))}else t.value=t.value.replace(/\\n/,"\n"),e.push(...a.encode(t.value))}return e}function*s(){let e;for(;;)if(e=n("number"))e.value=e.value.replace(/_/g,""),yield{param:e};else if(e=n("hex"))e.value=e.value.replace(/_/g,""),yield{param:e};else if(e=n("string"))yield{param:e};else if(e=n("label"))yield{param:e};else{if(!(e=n("param")))break;{let t;if(t=n("number")){yield{param:e,value:t};continue}if(t=n("hex")){yield{param:e,value:t};continue}yield{param:e}}}}return e(),function e(){const a=n("label");if(a)return{ref:a};if(t("string"))return{data:i()};const l=n("lparen");let o;if(l)o=r("instr");else if(o=n("instr"),!o)return;const u={instr:o,name:n("label"),params:[...s()],children:[]};if(l){let n;for(;!t("eof")&&(n=e());)u.children.push(n);u.params.push(...s()),r("rparen")}else if("block"===o.value||"loop"===o.value){let n;for(;!t("eof")&&!t("instr","end")&&(n=e());)u.children.push(n);r("instr","end")}return u}()}function*r(e){var t;for(t=e,s.setBigInt64(0,t),e=s.getBigInt64(0);;){const t=Number(0x7Fn&e);if(0n===(e>>=7n)&&0==(64&t)||-1n===e&&0!=(64&t)){yield t;break}yield 128|t}}function*a(e){let t=0;const n=Math.ceil(Math.log2(Math.abs(e))),r=e<0;let a=!0;for(;a;)t=127&e,e>>=7,r&&(e|=-(1<<n-7)),0==e&&0==(64&t)||-1==e&&64==(64&t)?a=!1:t|=128,yield t}function*i(e,t=0){let n=0;do{n=127&e,(0!=(e>>=7)||t>0)&&(n|=128),yield n,t--}while(0!=e||t>-1)}var s=new DataView(new BigInt64Array(1).buffer);var l=0x8000000000000000n,o=0x7ff0000000000000n;var u={"type.i32":127,"type.i64":126,"type.f32":125,"type.f64":124,"type.void":64,"type.func":96,"type.funcref":112,"section.custom":0,"section.type":1,"section.import":2,"section.function":3,"section.table":4,"section.memory":5,"section.global":6,"section.export":7,"section.start":8,"section.element":9,"section.code":10,"section.data":11,"import.func":0,"import.table":1,"import.memory":2,"import.global":3,"export.function":0,"export.table":1,"export.memory":2,"export.global":3,"global.const":0,"global.var":1,"global.mut":1,"limits.min":0,"limits.minmax":1,"limits.shared":3},c=["unreachable","nop","block","loop","if","else",,,,,,"end","br","br_if","br_table","return","call","call_indirect",,,,,,,,,"drop","select",,,,,"local.get","local.set","local.tee","global.get","global.set",,,,"i32.load","i64.load","f32.load","f64.load","i32.load8_s","i32.load8_u","i32.load16_s","i32.load16_u","i64.load8_s","i64.load8_u","i64.load16_s","i64.load16_u","i64.load32_s","i64.load32_u","i32.store","i64.store","f32.store","f64.store","i32.store8","i32.store16","i64.store8","i64.store16","i64.store32","memory.size","memory.grow","i32.const","i64.const","f32.const","f64.const","i32.eqz","i32.eq","i32.ne","i32.lt_s","i32.lt_u","i32.gt_s","i32.gt_u","i32.le_s","i32.le_u","i32.ge_s","i32.ge_u","i64.eqz","i64.eq","i64.ne","i64.lt_s","i64.lt_u","i64.gt_s","i64.gt_u","i64.le_s","i64.le_u","i64.ge_s","i64.ge_u","f32.eq","f32.ne","f32.lt","f32.gt","f32.le","f32.ge","f64.eq","f64.ne","f64.lt","f64.gt","f64.le","f64.ge","i32.clz","i32.ctz","i32.popcnt","i32.add","i32.sub","i32.mul","i32.div_s","i32.div_u","i32.rem_s","i32.rem_u","i32.and","i32.or","i32.xor","i32.shl","i32.shr_s","i32.shr_u","i32.rotl","i32.rotr","i64.clz","i64.ctz","i64.popcnt","i64.add","i64.sub","i64.mul","i64.div_s","i64.div_u","i64.rem_s","i64.rem_u","i64.and","i64.or","i64.xor","i64.shl","i64.shr_s","i64.shr_u","i64.rotl","i64.rotr","f32.abs","f32.neg","f32.ceil","f32.floor","f32.trunc","f32.nearest","f32.sqrt","f32.add","f32.sub","f32.mul","f32.div","f32.min","f32.max","f32.copysign","f64.abs","f64.neg","f64.ceil","f64.floor","f64.trunc","f64.nearest","f64.sqrt","f64.add","f64.sub","f64.mul","f64.div","f64.min","f64.max","f64.copysign","i32.wrap_i64","i32.trunc_f32_s","i32.trunc_f32_u","i32.trunc_f64_s","i32.trunc_f64_u","i64.extend_i32_s","i64.extend_i32_u","i64.trunc_f32_s","i64.trunc_f32_u","i64.trunc_f64_s","i64.trunc_f64_u","f32.convert_i32_s","f32.convert_i32_u","f32.convert_i64_s","f32.convert_i64_u","f32.demote_f64","f64.convert_i32_s","f64.convert_i32_u","f64.convert_i64_s","f64.convert_i64_u","f64.promote_f32","i32.reinterpret_f32","i64.reinterpret_f64","f32.reinterpret_i32","f64.reinterpret_i64"],f={get_local:"local.get",set_local:"local.set",tee_local:"local.tee",get_global:"global.get",set_global:"global.set","i32.trunc_s/f32":"i32.trunc_f32_s","i32.trunc_u/f32":"i32.trunc_f32_u","i32.trunc_s/f64":"i32.trunc_f64_s","i32.trunc_u/f64":"i32.trunc_f64_u","i64.extend_s/i32":"i64.extend_i32_s","i64.extend_u/i32":"i64.extend_i32_u","i64.trunc_s/f32":"i64.trunc_f32_s","i64.trunc_u/f32":"i64.trunc_f32_u","i64.trunc_s/f64":"i64.trunc_f64_s","i64.trunc_u/f64":"i64.trunc_f64_u","f32.convert_s/i32":"f32.convert_i32_s","f32.convert_u/i32":"f32.convert_i32_u","f32.convert_s/i64":"f32.convert_i64_s","f32.convert_u/i64":"f32.convert_i64_u","f32.demote/f64":"f32.demote_f64","f64.convert_s/i32":"f64.convert_i32_s","f64.convert_u/i32":"f64.convert_i32_u","f64.convert_s/i64":"f64.convert_i64_s","f64.convert_u/i64":"f64.convert_i64_u","f64.promote/f32":"f64.promote_f32"};for(const[e,t]of c.entries())null!=t&&(u[t]=e);for(const e in f){const t=c.indexOf(f[e]);u[e]=t}var p={};for(const e in u){p[e]=d(e);const[t,n]=e.split(".");null!=n&&(u[t]=u[t]??{},u[t][n]=u[e],p[t]=p[t]??{},p[t][n]=d(e))}var m={"i32.load":4,"i64.load":8,"f32.load":4,"f64.load":8,"i32.load8_s":1,"i32.load8_u":1,"i32.load16_s":2,"i32.load16_u":2,"i64.load8_s":1,"i64.load8_u":1,"i64.load16_s":2,"i64.load16_u":2,"i64.load32_s":4,"i64.load32_u":4,"i32.store":4,"i64.store":8,"f32.store":4,"f64.store":8,"i32.store8":1,"i32.store16":2,"i64.store8":1,"i64.store16":2,"i64.store32":4};function d(e){return function(t,n){return function*(e,t=[],n=[]){for(let e of n)if("number"==typeof e)yield e;else yield*e;yield u[e];for(let n of t)switch(typeof n){case"bigint":yield*r(n);break;case"number":yield*(h[e]??a)(n);break;default:yield*n}}(e,null==t||Array.isArray(t)?t:[t],null==n||Array.isArray(n)?n:[n])}}var h={"f64.const":function*(e){s.setFloat64(0,e);for(let e=8;e--;)yield s.getUint8(e)},"f32.const":function*(e){s.setFloat32(0,e);for(let e=4;e--;)yield s.getUint8(e)}};var _=new TextEncoder("utf-8");function g(e){return[..._.encode(e)]}function v(e,t){return[u.section[e],...i(t.length),...t]}function b(e){return[...i(e.length),...e.flat()]}function y(e){const t=[];let n,r=[];for(const a of e)a!==n&&r.length&&(t.push([...i(r.length),u.type[r[0]]]),r=[]),r.push(a),n=a;return r.length&&t.push([...i(r.length),u.type[r[0]]]),t}function x(e,t,n){return null!=n?[u.limits.shared,...i(e),...i(t)]:null!=t?[u.limits.minmax,...i(e),...i(t)]:[u.limits.min,...i(e)]}v.type=function(e){return v("type",b(e.map((([e,t])=>[u.type.func,...b(e.map((e=>u.type[e]))),...b(t.map((e=>u.type[e])))]))))},v.import=function(e){return v("import",b(e.map((([e,t,n,r])=>[...b(g(e)),...b(g(t)),u.import[n],...{func:()=>r.map((e=>[...i(e)])),memory:()=>x(...r)}[n]()]))))},v.function=function(e){return v("function",b(e.map((e=>[...i(e)]))))},v.table=function(e){return v("table",b(e.map((([e,t,n])=>[u.type[e],...x(t,n)]))))},v.memory=function(e){return v("memory",b(e.map((([e,t])=>x(e,t)))))},v.global=function(e){return v("global",b(e.map((([e,t,n])=>[u.type[t],u.global[e],...n,u.end]))))},v.export=function(e){return v("export",b(e.map((([e,t,n])=>[...b(g(e)),u.export[t],...i(n)]))))},v.start=function(e){return v("start",[...i(e)])},v.element=function(e){return v("element",b(e.map((([e,t,n])=>[...i(e),...t,u.end,...b(n)]))))},v.code=function(e){return v("code",b(e.map((([e,t])=>b([...b(y(e)),...t,u.end])))))},v.data=function(e){return v("data",b(e.map((([e,t,n])=>[...i(e),...t,u.end,...b(n)]))))};var k=class extends Array{log=[];write(e,t){return this.log.push(e,t),this.push(...e),this}get buffer(){return new Uint8Array(this)}};function w(e,t,n){const a=new class{types=[];imports=[];tables=[];memories=[];globals=[];exports=[];starts="";elements=[];codes=[];datas=[];constructor(e){e&&Object.assign(this,e)}get funcs(){return this.codes.filter((e=>!e.imported))}ensureType(e,t){const n=[e.join(" "),t.join(" ")].join(),r=this.types.indexOf(n);return r>=0?r:this.types.push(n)-1}getGlobalIndexOf(e){return this.globals.find((t=>t.name===e)).idx}getFunc(e){return this.codes.find((t=>t.name===e))}getMemory(e){return this.memories.find((t=>t.name===e))}getType(e){return this.types[e]}type(e,t,n){return this.types[e]=this.ensureType(t,n),this}import(e,t,n,r,a,i){if("func"===e){const s=this._func(t,a,i,[],[],!1,!0);this.imports.push({mod:n,field:r,type:e,desc:[s.type_idx]})}else"memory"===e&&this.imports.push({mod:n,field:r,type:e,desc:a});return this}table(e,t,n){return this.tables.push({type:e,min:t,max:n}),this}memory(e,t,n){return this.memories.push({name:e,min:t,max:n}),this}global(e,t,n,r){const a=this.globals.length;return this.globals.push({idx:a,name:e,valtype:n,mut:t,expr:r}),this}export(e,t,n){return this.exports.push({type:e,name:t,export_name:n}),this}start(e){return this.starts=e,this}elem(e,t){return this.elements.push({offset_idx_expr:e,codes:t}),this}_func(e,t=[],n=[],r=[],a=[],i=!1,s=!1){const l=this.ensureType(t,n),o={idx:this.codes.length,name:e,type_idx:l,locals:r,body:a,imported:s};return this.codes.push(o),i&&this.export("func",e,e),o}func(...e){return this._func(...e),this}data(e,t){return this.datas.push({offset_idx_expr:e,bytes:t}),this}build({metrics:e=!0}={}){e&&console.time("module build");const t=new k;return t.write([...g("\0asm"),1,0,0,0]),this.types.length&&t.write(v.type(this.types.map((e=>e.split(",").map((e=>e.split(" ").filter(Boolean))))))),this.imports.length&&t.write(v.import(this.imports.map((e=>[e.mod,e.field,e.type,e.desc])))),this.funcs.length&&t.write(v.function(this.funcs.map((e=>e.type_idx)))),this.elements.length&&t.write(v.table(this.tables.map((e=>[e.type,e.min,e.max])))),this.memories.length&&t.write(v.memory(this.memories.map((e=>[e.min,e.max])))),this.globals.length&&t.write(v.global(this.globals.map((e=>[e.mut,e.valtype,e.expr])))),this.exports.length&&t.write(v.export(this.exports.map((e=>"func"===e.type?[e.export_name,e.type,this.getFunc(e.name).idx]:"memory"===e.type?[e.export_name,e.type,this.getMemory(e.name).idx]:[])))),this.starts.length&&t.write(v.start(this.getFunc(this.starts).idx)),this.elements.length&&t.write(v.element(this.elements.map((e=>[0,e.offset_idx_expr,e.codes.map((e=>this.getFunc(e).idx))])))),this.funcs.length&&t.write(v.code(this.funcs.map((e=>[e.locals,e.body])))),this.datas.length&&t.write(v.data(this.datas.map((e=>[0,e.offset_idx_expr,e.bytes])))),e&&console.timeEnd("module build"),t}}(t),u=new class{globals=[];types=[];funcs=[];constructor(e){e&&Object.assign(this,e)}lookup(e,t){let n;switch(t){case"call":n=this.funcs.map((e=>e.name)).lastIndexOf(e);break;case"type":n=this.types.map((e=>e.name)).lastIndexOf(e);break;default:n=this.globals.map((e=>e.name)).lastIndexOf(e)}return i(n)}}(n),c=[];function f(e,t=u,n="i32"){switch(e.kind){case"number":if("inf"===e.value||"+inf"===e.value)return 1/0;if("-inf"===e.value)return-1/0;if("nan"===e.value||"+nan"===e.value)return NaN;if("-nan"===e.value)return NaN;if("f"===n?.[0])return parseFloat(e.value);case"hex":{let t;return 0===n.indexOf("i64")?(t="-"===e.value[0]?-BigInt(e.value.slice(1)):BigInt(e.value),t):"f"===n[0]?(t=e.value.indexOf("nan")>=0?0===n.indexOf("f32")?function*(e){let t=parseInt(e.split("nan:")[1]);t|=2139095040,"-"===e[0]&&(t|=2147483648),s.setInt32(0,t);for(let e=4;e--;)yield s.getUint8(e)}(e.value):function*(e){let t=BigInt(e.split("nan:")[1]);t|=o,"-"===e[0]&&(t|=l),s.setBigInt64(0,t);for(let e=8;e--;)yield s.getUint8(e)}(e.value):function(e){const t=(e=e.toUpperCase()).indexOf("P");let n,r;-1!==t?(n=e.substring(0,t),r=parseInt(e.substring(t+1))):(n=e,r=0);const a=n.indexOf(".");if(-1!==a){let e=parseInt(n.substring(0,a),16);const t=Math.sign(e);e*=t;const r=n.length-a-1,i=parseInt(n.substring(a+1),16),s=r>0?i/Math.pow(16,r):0;n=0===t?0===s?t:Object.is(t,-0)?-s:s:t*(e+s)}else n=parseInt(n,16);return n*(-1!==t?Math.pow(2,r):1)}(e.value),t):parseInt(e.value)}case"label":return t.lookup(e.value,n);default:return e.value}}class d{locals=[];depth=[];lookup(e,t){let n;switch(t){case"br":case"br_table":case"br_if":n=this.depth.lastIndexOf(e),~n&&(n=this.depth.length-1-n);break;default:n=this.locals.lastIndexOf(e)}return~n?i(n):u.lookup(e,t)}}function h(e,t,n){if(!(e in p)||"function"!=typeof p[e])throw new Error("Unknown instruction: "+e);return[...p[e](t,n)]}function _(e,t=u){const n={offset:0,align:0},s=e.instr.value;switch(s){case"type":return a.getType(e.name.value);case"call_indirect":{const n=[_(e.children.shift(),t),0],r=e.children.flatMap((e=>_(e,t)));return h(s,n,r)}case"memory.grow":{const n=[0],r=e.children.flatMap((e=>_(e,t)));return h(s,n,r)}case"i32.load":case"i64.load":case"f32.load":case"f64.load":case"i32.load8_s":case"i32.load8_u":case"i32.load16_s":case"i32.load16_u":case"i64.load8_s":case"i64.load8_u":case"i64.load16_s":case"i64.load16_u":case"i64.load32_s":case"i64.load32_u":case"i32.store":case"i64.store":case"f32.store":case"f64.store":case"i32.store8":case"i32.store16":case"i64.store8":case"i64.store16":case"i64.store32":{n.align=m[s];for(const t of e.params)n[t.param.value]=f(t.value);const a=[Math.log2(n.align),n.offset].map((e=>"number"==typeof e?i(e):"bigint"==typeof e?r(e):void 0)),l=e.children.flatMap((e=>_(e,t)));return h(s,a,l)}case"func":{const t={name:e.name?.value??u.funcs.length,params:[],results:[]};u.funcs.push(t);for(const n of e.children)switch(n.instr.value){case"param":t.params.push(...n.children.map((e=>e.instr.value)));break;case"result":t.results.push(...n.children.map((e=>e.instr.value)))}return[t.name,t.params,t.results]}case"result":return e.children.flatMap((e=>p.type[e.instr.value]()));case"else":case"then":return e.children.flatMap((e=>_(e,t)));case"if":{const n=e.name?.value??t.depth.length,r=[],a=[];let i;t.depth.push(n);for(const n of e.children)switch(n.instr.value){case"result":r.push(_(n,t));break;case"else":a.push(...p.else());case"then":a.push(_(n,t));break;default:i=_(n,t)}return t.depth.pop(),r.length||r.push(p.type.void()),[...p.if(r.flat(),i),...a.flat(),...p.end()]}case"loop":case"block":{const n=e.name?.value??t.depth.length,r=[],a=[];t.depth.push(n);for(const n of e.children)if("result"===n.instr.value)r.push(_(n,t));else a.push(_(n,t));return t.depth.pop(),r.length||r.push(p.type.void()),[...p[s](),...r.flat().map((e=>[...e])),...a.flat(),...p.end()]}case"br_table":{e.name&&e.params.unshift({param:{value:t.lookup(e.name.value,s)}});const n=e.params.map((e=>f(e.param,t,s))),r=e.children.flatMap((e=>_(e,t)));return h(s,[n.length-1,...n],r)}default:{e.name&&e.params.unshift({param:{value:(s.startsWith("global")?u:t).lookup(e.name.value,s)}});const n=e.params.map((e=>f(e.param,t,s))),r=e.children.flatMap((e=>_(e,t)));return h(s,n,r)}}}return function e(t){switch(t.instr.value){case"module":t.children.forEach((t=>e(t)));break;case"memory":{const e=t.name?.value??a.memories.length,n=t.params.map((e=>f(e.param))).flat();if("export"===t.children?.[0]?.instr.value){const e=t.children[0].params[0].param.value,n=t.children[0].name?.value??0;a.export("memory",n,e)}a.memory(e,...n)}break;case"data":{const e=t.children.shift(),n=t.children.shift().data;a.data(_(e),n)}break;case"start":a.start(t.name.value);break;case"table":{const e=t.params.map((e=>f(e.param)));e.unshift(e.pop()),a.table(...e)}break;case"elem":{const e=t.children.shift(),n=t.children.map((e=>e.ref.value));a.elem(_(e),n)}break;case"import":if("func"===t.children[0].instr.value){const e=t.params.map((e=>f(e.param))),n=_(t.children[0]),r=n.shift();a.import("func",r,...e,...n)}else if("memory"===t.children[0].instr.value){const e=t.children[0],n=t.params.map((e=>f(e.param))),r=e.instr.name,i=e.params.map((e=>f(e.param)));a.import("memory",r,...n,i)}break;case"global":{const e={name:t.name?.value??a.globals.length,vartype:"const",type:t.children[0].instr.value};u.globals.push(e),"mut"===e.type&&(e.vartype="var",e.type=t.children[0].children[0].instr.value);const n=t.children[1];a.global(e.name,e.vartype,e.type,_(n))}break;case"type":{const e={name:t.name?.value??a.types.length,params:[],results:[]};u.types.push(e);for(const n of t.children[0].children)switch(n.instr.value){case"param":e.params.push(...n.children.map((e=>e.instr.value)));break;case"result":e.results.push(...n.children.map((e=>e.instr.value)))}a.type(e.name,e.params,e.results)}break;case"export":{const e={name:t.params[0].param.value};e.type=t.children[0].instr.value,e.internal_name=t.children[0].name.value,a.export(e.type,e.internal_name,e.name)}break;case"func":{const e={name:t.name?.value??u.funcs.length,context:new d,params:[],results:[],locals:[],body:[]};u.funcs.push(e);for(const n of t.children)switch(n.instr.value){case"export":{const t=n.params[0].param.value;a.export("func",e.name,t)}break;case"local":e.locals.push(...n.children.map((e=>e.instr.value))),e.context.locals.push(...n.children.map((()=>n.name?.value)));break;case"param":e.params.push(...n.children.map((e=>e.instr.value))),e.context.locals.push(...n.children.map((()=>n.name?.value)));break;case"result":e.results.push(...n.children.map((e=>e.instr.value)));break;default:e.body.push(n)}c.push((()=>{a.func(e.name,e.params,e.results,e.locals,[...e.body.flatMap((t=>_(t,e.context)))])}))}}}(e),c.forEach((e=>e())),{module:a,global:u}}function I(e,r,a={}){return w(n(t("(module "+e+")")),a.module,a.global).module.build(r).buffer}export{w as compile,I as default,n as parse,t as tokenize};
