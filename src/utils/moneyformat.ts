function moneyformatAmount(amount:any, num: number = 2) {
    // if(amount == 0){
    //     return '0.00'
    // }
    // 将金额转换为数字类型
    amount = Number(amount);

    // 使用Math.ceil()函数进行进位
    amount = Math.round(amount *  Math.pow(10, num)) /  Math.pow(10, num);

    // 将金额转换为字符串类型
    amount = (amount.toFixed(num)).toString();

    // 使用正则表达式添加逗号分隔符
    amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // 返回格式化后的金额
    return amount;
}
function countformatAmount(amount:any) {

    // 使用正则表达式添加逗号分隔符
    amount = amount.toLocaleString();

    // 返回格式化后的金额
    return amount;
}



export default {
    moneyformatAmount,
    countformatAmount
}
