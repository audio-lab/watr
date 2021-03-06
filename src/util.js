// encoding ref: https://github.com/j-s-n/WebBS/blob/master/compiler/byteCode.js
export const uleb = (number, buffer=[]) => {
  if (typeof number === 'string') number = parseInt(number.replaceAll('_',''))

  let byte = number & 0b01111111;
  number = number >>> 7;

  if (number === 0) {
    buffer.push(byte);
    return buffer;
  } else {
    buffer.push(byte | 0b10000000);
    return uleb(number, buffer);
  }
}

export function leb (n, buffer=[]) {
  if (typeof n === 'string') n = parseInt(n.replaceAll('_',''))

  while (true) {
    const byte = Number(n & 0x7F)
    n >>= 7
    if ((n === 0 && (byte & 0x40) === 0) || (n === -1 && (byte & 0x40) !== 0)) {
      buffer.push(byte)
      break
    }
    buffer.push((byte | 0x80))
  }
  return buffer
}

export function bigleb(n, buffer=[]) {
  if (typeof n === 'string') {
    n = n.replaceAll('_','')
    n = n[0]==='-'?-BigInt(n.slice(1)):BigInt(n)
    byteView.setBigInt64(0, n)
    n = byteView.getBigInt64(0)
  }

  while (true) {
    const byte = Number(n & 0x7Fn)
    n >>= 7n
    if ((n === 0n && (byte & 0x40) === 0) || (n === -1n && (byte & 0x40) !== 0)) {
      buffer.push(byte)
      break
    }
    buffer.push((byte | 0x80))
  }
  return buffer
}

// generalized float cases parser
const flt = input => input==='nan'||input==='+nan'?NaN:input==='-nan'?-NaN:
    input==='inf'||input==='+inf'?Infinity:input==='-inf'?-Infinity:parseFloat(input.replaceAll('_',''))

const byteView = new DataView(new BigInt64Array(1).buffer)

const F32_SIGN = 0x80000000, F32_NAN  = 0x7f800000
export function f32 (input, value, idx) {
  if (~(idx=input.indexOf('nan:'))) {
    value = parseInt(input.slice(idx+4))
    value |= F32_NAN
    if (input[0] === '-') value |= F32_SIGN
    byteView.setInt32(0, value)
  }
  else {
    value=typeof input === 'string' ? flt(input) : input
    byteView.setFloat32(0, value);
  }

  return [
    byteView.getUint8(3),
    byteView.getUint8(2),
    byteView.getUint8(1),
    byteView.getUint8(0)
  ];
}

const F64_SIGN = 0x8000000000000000n, F64_NAN  = 0x7ff0000000000000n
export function f64 (input, value, idx) {
  if (~(idx=input.indexOf('nan:'))) {
    value = BigInt(input.slice(idx+4))
    value |= F64_NAN
    if (input[0] === '-') value |= F64_SIGN
    byteView.setBigInt64(0, value)
  }
  else {
    value=typeof input === 'string' ? flt(input) : input
    byteView.setFloat64(0, value);
  }

  return [
    byteView.getUint8(7),
    byteView.getUint8(6),
    byteView.getUint8(5),
    byteView.getUint8(4),
    byteView.getUint8(3),
    byteView.getUint8(2),
    byteView.getUint8(1),
    byteView.getUint8(0)
  ];
}
