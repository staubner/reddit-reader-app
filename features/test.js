const test = async () => {
    const response = await fetch('https://www.reddit.com/r/MadeMeSmile/comments/11g7oot/truth_or_dare.json');
    const json = await response.json();
    return json;
}

// const testData = await test();

// console.log(testData)