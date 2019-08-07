import React from "react";
import './App.css';


class Home extends React.Component{

    state={
           currencies: ['USD', 'AUD','EUR', 'SGD', 'PHP', ],
           base:'USD',
           amount: '0',
           convertTo:'EUR',
           result:'0',
           date:'yy/mm/dd'
    };

    handleSelect = (e) => {
      this.setState({
          [e.target.name]: e.target.value,
          result:null
      },
      this.calculate
      );

    };

    handleInput = (e) => {
        this.setState({
           amount: e.target.value,
           result: null
        },
        this.calculate
        );
  
      };

      calculate = () => {
          const amount = this.state.amount;
          if(amount === isNaN){
              return
          }else{
            fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
            .then(res => res.json())
            .then(data => {
                const date = data.date;
                const result = (data.rates[this.state.convertTo] * amount).toFixed(4);
                this.setState({
                    result,
                    date
                });
            });
          }
      };   
    render(){
        const {currencies, base, amount, convertTo, result, date} = this.state
        return(
             <div className="converter">
             
             <div className="first-container">
             <p className="texts">Currency Converter</p>
             <label>Amount</label>
             <input onChange={this.handleInput} type="number"  value={amount} className="input"></input>
             <label>From:</label>
             <select className="select" name="base" value={base} onChange={this.handleSelect}>
             {currencies.map(currency =><option key={currency} value={currency}>
                  {currency}
               </option>
                )}
             </select>
             <label>To:</label>
             <select name="convertTo" value={convertTo} onChange={this.handleSelect} className="select">
             {currencies.map(currency =><option key={currency} value={currency}>
                  {currency}
               </option>                
                )}
             </select>
             
             </div>
             <div className="second-container">
             <div>
             <p className="yeah"><span className="amount">{amount}</span><span className="base">{base}</span> </p>
             <p className="equal">=</p>
             <p className="yeah"><span>{result === null ? "Calculating... ": result}{convertTo}</span></p>
             <p className="dates">As of </p>
             <div className="date">{date}</div>
             </div>
             
             </div>

             </div>
            
        );
    };
};


export default Home;