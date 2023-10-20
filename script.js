//set variables
const taxType = ["it", "cgt", "iht", "ct", "vat", "nic"];
let chooseTaxType = 0;
const paraText =[ ["Income tax",
" is a tax that you pay on the money you earn from your job, pension, or investments and is one of the main sources of revenue for the UK government.",
"There is a Personal Allowance, which is the amount of money you can earn each year before you have to start paying income tax. Currently, this allowance is £12,570.",
"If you earn more than your Personal Allowance, you will pay income tax on the rest of your earnings. The rate of income tax you pay depends on how much you earn. The higher your income, the higher the rate of tax you will pay.",
"If you are an employee, income tax is collected through wages. Your employer will deduct income tax from your pay and send it to the government on your behalf. If you are self-employed, you will need to pay income tax yourself by submitting a tax return each year."
],
["Capital gains tax (CGT)",
" is a tax that you pay on the profit you make when you dispose of an asset that has increased in value. This could include things like shares or property.",
"You do not have to pay CGT on all of your capital gains. There is an annual allowance, which is the amount of capital gain you can make each year without having to pay any tax. Currently, the annual allowance is £6,000.",
"If you make a capital gain that is above your annual allowance, you will have to pay CGT on the excess. The rate of CGT you pay depends on your income tax band and the type of asset. Rates of CGT range from 10% to 28%.",
"CGT is collected through your tax return. If you make a capital gain in a tax year, you will need to declare it on your tax return and pay any tax that is due."
],
["Inheritance tax (IHT)",
" is mainly a tax that is paid on the estate of someone who has died. It is only paid on estates that are worth over a certain amount of money, which is known as the nil rate band which is currently £325,000.",
"If an estate is worth more than the nil rate band, IHT will be charged on the excess at a rate of 40%.  IHT can also be payable during a person's lifetime if they give away assets and the lifetime rate is 20%.",
"There are a few things that can reduce the amount of IHT that is payable, such as leaving money to charity or to a spouse or civil partner.IHT is collected from the executor of the estate",
"The executor is the person who is responsible for carrying out the wishes of the deceased person, as expressed in their will. The executor will need to calculate the amount of IHT that is due and pay it to the government."
],
["Corporation tax (CT)",
" is a tax that companies pay on their profits. CT applies to all companies that are registered in the UK, foreign companies with a UK office or branch and unincorporated groups such as sports or community groups.",
"The rate of corporation tax depends on the size of the company's profits. The main rate of corporation tax is currently 25% but there is a small profits rate of 19% for companies with profits of £50,000 or less.",
"Corporation tax is collected through the company's tax return. Companies have to submit a tax return each year to HM Revenue & Customs, which is the UK tax authority. The tax return includes information about the company's profits and losses and the amount of corporation tax that is due.",
""],
["Value Added Tax (VAT)",
" is added to most goods and services that are bought and sold in the UK. It is a consumption tax, so it is paid by the people who buy the goods and services.",
"The standard rate of VAT in the UK is 20% but some goods and services are exempt from VAT such as basic food, books and children's clothes. Some goods and services are charged at a reduced rate of VAT, such as domestic electricity.",
"Businesses have to register for VAT if their turnover is over £85,000 per year. VAT is collected by businesses and paid over to HM Revenue & Customs (HMRC) by submitting a VAT return. These returns are usually quarterly but can be monthly or annually in some cases. The VAT return shows how much VAT the business has charged and how much VAT they have paid. The difference between these is paid to (or claimed from) HMRC",
""],
["National Insurance (NI)",
" is similar to income tax, but it helps to pay for some state benefits at times when individuals need help, for example, when unemployed, ill, in retirement or on bereavement.",
"NIC is paid on earned income and you start paying NIC when you reach 16 and stop after reaching retirement age. Employees pay NI on their earnings from their job and employers also pay NI on their employees' earnings. The self-employed pay NI directly via their tax return.",
"The amount of NI that is paid depends on  your earnings.  There is a lower threshold under which you do not pay NIC (currently £12,570 per year) and there are different rates depending whether you are employed, self-employed or an employer.",
""]
]
let tax = 0;
let nic=0;
let loanPayment = 0;
const persAllce = 12579/12;
const basicRateBand = 50270/12;
const paMaxThreshold = 100000/12;
const higherRateBand = 125140/12;
const lowerEarningsLimit = 533;
const primaryThreshold = 1048;
const upperEarningsLimit = 4189;

window.onload = () => {
    // Code that runs when the document is loaded   
setText();
}

function setText() {
let boldText = document.getElementById("bold-text");
let paraOne = document.getElementById("para1");
let paraTwo = document.getElementById("para2");
let paraThree = document.getElementById("para3");
let paraFour = document.getElementById("para4");
boldText.innerHTML = paraText[chooseTaxType][0];
console.log(paraText[chooseTaxType][0]);
paraOne.innerHTML = paraText[chooseTaxType][1];
paraTwo.innerHTML = paraText[chooseTaxType][2];
paraThree.innerHTML = paraText[chooseTaxType][3];
paraFour.innerHTML = paraText[chooseTaxType][4];
}

//home page arrows
function scrollingRight() {
   chooseTaxType = chooseTaxType+1;
   if(chooseTaxType>5){chooseTaxType=0};
   console.log(chooseTaxType)
   console.log(taxType[chooseTaxType]);
 setText();
}

function scrollingLeft() {
    chooseTaxType = chooseTaxType-1;
    if(chooseTaxType<0){chooseTaxType=5};
    console.log(chooseTaxType)
    console.log(taxType[chooseTaxType]);
    setText();
   }
 


   //Run the Calulator
   function calculateResults() 
   {
    document.getElementById("error").innerHTML ="";//remove the error message if there is one
    
    const payInput = document.getElementById("gpay").value;
    const pensionInput = document.getElementById("pension").value;

    //Validate inputs
    if (isNaN(payInput) || isNaN(pensionInput) ) { console.log("not a number");  errorMessage()}
      
    const gPay = Number(document.getElementById("gpay").value);
    const pension = Number(document.getElementById("pension").value);

    if (pension>100 || pension<0 || gPay<0) {console.log("number out of bounds"); errorMessage()}
    else{
    
    const studentLoan = document.getElementById("studentloan").value;
    const netPay = gPay-(pension/100*gPay)
     
    // Calculate the tax
       const adjustedPersAllce = persAllce-(Math.floor((netPay-paMaxThreshold)/2))
       if(netPay<=paMaxThreshold){
          if (netPay<=basicRateBand && netPay>persAllce){ tax = (netPay-persAllce) * 0.2}
          else if (netPay<= persAllce){tax = 0}
          else { tax = (((netPay - basicRateBand)*.4)+((basicRateBand-persAllce)*.2)) }
        }
        else if (netPay>= higherRateBand) { tax = (((netPay - higherRateBand)*.45)+((higherRateBand-(basicRateBand-persAllce))*.4)+((basicRateBand-persAllce)*.2))}
        else {tax = (((netPay - adjustedPersAllce -(basicRateBand-persAllce))*.4)+((basicRateBand-persAllce)*.2)) }
   
    // Calculate the Ni
        if (gPay<= lowerEarningsLimit){nic=0}
        else if (gPay<=4189){nic=((gPay-primaryThreshold)*.12)}
        else { nic = (((gPay-upperEarningsLimit)*.02)+((upperEarningsLimit-primaryThreshold)*0.12))}

    //Calculate pension contributions
        const pensionPaid = pension/100*gPay

    //Calculate Student loan deduction
        const plan1Threshold = 1834;
        const plan2Threshold = 2274;
        if (studentLoan === "none"){loanPayment=0;}
        else if (studentLoan === "Plan1"){loanPayment=((gPay-plan1Threshold)*.09)}
        else {loanPayment=((gPay-plan2Threshold)*.09)};
        if (loanPayment<0){loanPayment=0};

    //Calculate net Pay
        const netWages = gPay - pensionPaid - tax - nic - loanPayment

    // Display the results
        const formatter = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });//thanks Google!
        const gPayFormatted = formatter.format(gPay);
        document.getElementById("grosspay").innerHTML = gPayFormatted;
        const taxFormatted = formatter.format(tax)
        document.getElementById("tax").innerHTML = taxFormatted;
        const nicFormatted = formatter.format(nic)
        document.getElementById("ni").innerHTML = nicFormatted;
        const pensionFormatted = formatter.format(pensionPaid)
        document.getElementById("pension-contribution").innerHTML = pensionFormatted;
        const sloanFormatted = formatter.format(loanPayment)
        document.getElementById("sloan").innerHTML = sloanFormatted;
        const wagesFormatted = formatter.format(netWages)
        document.getElementById("takehome").innerHTML = wagesFormatted;
   }
  }

   function errorMessage() {
    document.getElementById("error").innerHTML = "Invalid Input.  Pay should be a positive number and pension should be a number between 0 and 100"
    document.getElementById("grosspay").innerHTML = "";
    document.getElementById("tax").innerHTML = "";
    document.getElementById("ni").innerHTML = "";
    document.getElementById("pension-contribution").innerHTML = "";
    document.getElementById("sloan").innerHTML = "";
    document.getElementById("takehome").innerHTML = "";
    throw new Error("");//stops NaN being displayed in results
  }

  function goCode() {
  //set display to show
  const codePage = document.getElementById("tax-code-window");
  codePage.style.display = "block"; //switch on the hidden page
  //take off illustrated by...
  const attri = document.getElementById("ee-attri");
  attri.style.display = "none"; //switch off the attribution
  }

  function returnPage() {
    const codePage = document.getElementById("tax-code-window");
    codePage.style.display = "none"; //hide the page again
    const attri = document.getElementById("ee-attri");
  attri.style.display = "block"; //switch on the attribution
  }

