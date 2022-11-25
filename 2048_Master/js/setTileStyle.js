function setBackgroundColor(tileValue){
    switch(Number(tileValue)){
        case 2: return 'var(--bgColor2)';
        case 4: return 'var(--bgColor4)';
        case 8: return 'var(--bgColor8)';
        case 16: return 'var(--bgColor16)';
        case 32: return 'var(--bgColor32)';
        case 64: return 'var(--bgColor64)';
        case 128: return 'var(--bgColor128)';
        case 256: return 'var(--bgColor256)';
        case 512: return 'var(--bgColor512)';
        case 1024: return 'var(--bgColor1024)';
        case 2048: return 'var(--bgColor2048)';
        default: return 'var(--bgColorOther)';
    }
}

function setColor(tileValue){
    if(Number(tileValue) === 2 || Number(tileValue) === 4){
        return 'var(--colorValue2or4orTitle)';
    } else{
        return 'var(--colorValueOthers)';
    }
}

function setSize(tileValue){
    let val = Number(tileValue)
    let arr = [2, 4, 8, 16, 32, 64],
        arr2 = [128, 256, 512],
        arr3 = [1024, 2048, 4096, 8192],
        arr4 = [16384, 32768, 65536]
    if(arr.indexOf(val) !== -1){
        return 'var(--textSizeSinglOrTwoeDigit)';
    }
    if(arr2.indexOf(val) !== -1){
        return 'var(--textSizeThreeDigit)';
    }
    if(arr3.indexOf(val) !== -1){
        return 'var(--textSizeFourDigit)';
    }
    if(arr4.indexOf(val) !== -1){
        return 'var(--textSizeFiveDigit)';
    }
}

export default function setTileStyle(element, value){
    element.textContent = value;
    element.style.fontSize = setSize(value);
    element.style.color = setColor(value);
    element.style.backgroundColor = setBackgroundColor(value);
}