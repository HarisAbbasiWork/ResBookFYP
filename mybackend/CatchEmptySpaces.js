const onlySpaces=(str)=> {
    return str.trim().length === 0;
  }
  
  console.log(onlySpaces('   ')); // 👉️ true
  console.log(onlySpaces('  123  ')); // 👉️ false
  console.log(onlySpaces('hello ')); // 👉️ false
  console.log(onlySpaces('')); 