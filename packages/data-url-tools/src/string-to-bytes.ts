/**
 * http://stackoverflow.com/questions/1240408/reading-bytes-from-a-javascript-string
 */
export default function stringToBytes(str: string) {    
    var ch,
        st,
        re = [],
        j = 0;
    for (var i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i);
        if (ch < 127) {
            re[j++] = ch & 0xff;
        } else {
            st = []; // clear stack
            do {
                st.push(ch & 0xff); // push byte to stack
                ch = ch >> 8; // shift value down by 1 byte
            } while (ch);
            // add stack contents to result
            // done because chars have "wrong" endianness
            st = st.reverse();
            for (var k = 0; k < st.length; ++k) re[j++] = st[k];
        }
    }    
    return re; // byte[]
}