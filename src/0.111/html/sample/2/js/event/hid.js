async function getHid() {
    const device = await navigator.hid.requestDevice({filters: []});
    console.debug(device);
    let devices = await navigator.hid.getDevices();
    devices.forEach(device => {
        console.log(`HID: ${device.productName}`);
        console.debug(device);
    });
}
