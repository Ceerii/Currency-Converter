import React from "react";
import './App.css';


class Home extends React.Component{

    state={
           currencies: ['USD', 'AUD', 'NGN', 'EUR', 'SGD', 'PHP', ],
           base:'USD',
           amount: '',
           convertTo:'',
           result:'',
           date:''
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
            <div className="container">
            <div className="container-text">
            <p className="title">CURRENCY CONVERTER</p>
            <p className="first-currency">{amount} {base} is equal to</p>
            <p className="second-currency">{result === null ? "Calculating... ": result} {convertTo}</p>
            <p className="time">As of {date}</p>
            <div className="input-value">
            <form className="input-form">
            <input onChange={this.handleInput} type="number"  value={amount} className="input-box"   />
            <select name="base" value={base} onChange={this.handleSelect}  className="input-select">
            {currencies.map(currency =><option key={currency} value={currency}>
                 {currency}
              </option>
                )}
            </select>
            </form>

            <form className="input-form">
            <input disabled={true}   value={result === null ? "Calculating... ": result} className="input-box" type="number"/>
            <select name="convertTo" value={convertTo} onChange={this.handleSelect} className="input-select">
            {currencies.map(currency =><option key={currency} value={currency}>
                 {currency}
              </option>
                )}
            </select>
            </form>

            </div>

            </div>
            </div>

        );
    };
};


export default Home;