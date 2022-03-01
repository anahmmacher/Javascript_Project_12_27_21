async function getData1() {
    const response1 = await fetch('./world_data.json');
    const data1 = await response1.json();
    console.log(data1);
    return data1;
}

getData1()

getData2()

async function getData2() {
    const response2 = await fetch('./world_gender_data.json');
    const data2 = await response2.json();
    console.log(data2);
    return data2;
}