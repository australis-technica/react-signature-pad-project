const API_BASE = process.env.REACT_APP_API_BASE;
if (!API_BASE || API_BASE.trim() === "") {
  throw new Error("REACT_APP_API_BASE NOT set");
}

export interface ImageDto {
  id?: string;
  /**
   *  image-data-url
   */
  img?: string;
}

async function get(id: string) {
  try {
    const r = await fetch(`${API_BASE}/images/${id}`, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json"
      // },
      // body: JSON.stringify(dto)
    });
    if (!r.ok) {
      return Promise.reject(new Error(`${r.status}:${r.statusText}`));
    }  
    // swicth content-type
    const contentType = r.headers.get("Content-Type");
    if(/image\/*/.test(contentType)){
      let img = window.URL.createObjectURL(await r.blob());        
      return img;
    }
    if(/json/.test(contentType)){
      return r.json();
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
function set(_dto: ImageDto) {
  return Promise.reject(new Error("NOT IMPLEMENTED"));
}
async function add(dto: ImageDto) {
  try {
    const r = await fetch(`${API_BASE}/images`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dto)
    });
    if (!r.ok) {
      return Promise.reject(new Error(`${r.status}:${r.statusText}`));
    }
    return r.json();
  } catch (error) {
    return Promise.reject(error);
  }
}
function remove(_id: string) {
  return Promise.reject(new Error("NOT IMPLEMENTED"));
}
/**
 *
 */
export default {
  get,
  add,
  set,
  remove
};
