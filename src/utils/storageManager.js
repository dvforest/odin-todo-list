export function save(key, data){
    if (typeof data.serialize !== "function") {
        throw new Error("Data must implement serialize method.");
    }
    localStorage.setItem(key, JSON.stringify(data.serialize()));
}

export function load(key, ClassRef){
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    if (typeof ClassRef.deserialize !== "function") {
        throw new Error("Data must implement deserialize method.");
    }
    return ClassRef.deserialize(JSON.parse(raw));
}