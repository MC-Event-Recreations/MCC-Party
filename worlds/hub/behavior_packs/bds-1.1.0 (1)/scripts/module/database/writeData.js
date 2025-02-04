function writeData(t, r, e) {
    r.setDynamicProperty(t, JSON.stringify(e));
}

export { writeData };
