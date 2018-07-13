const API_BASE = process.env.REACT_APP_API_BASE;
if(!API_BASE || API_BASE.trim() === "") {
    throw new Error("REACT_APP_API_BASE NOT set");
}

export interface ImageDto {
  id?: string;
  /**
   *  image-data-url
   */
  img?: string;
}

function get(_id: string) {
  return Promise.reject(new Error("NOT IMPLEMENTED"));
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
            }, body: JSON.stringify(dto)
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
}