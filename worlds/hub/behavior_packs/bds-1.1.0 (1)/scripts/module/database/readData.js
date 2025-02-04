function readData(name, type) {
    const dbstring = type.getDynamicProperty(name);
    return JSON.parse(dbstring) || {};
}

export { readData }