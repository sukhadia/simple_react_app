const stock = [
      {
        name: 'orange', 
        qty: 5
      },
      { 
        name: 'lavendar', 
        qty: 2
      },
      {
        name: 'rose', 
        qty: 3
      }
    ];
    
class InventoryForm extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      candleType: '',
      candleQty: -1
    }
  }
  handleClick(event) {
    var candleTypeFld = $('#candleType'),
      candleQtyFld = $('#candleQty'),
      name = candleTypeFld.val(),
      qty = candleQtyFld.val();
    event.preventDefault();
  
    if (name) {
      $('#validationError').fadeOut();
      stock.push({
        name: name,
        qty: qty
      });
      candleTypeFld.val('');
      candleQtyFld.val('');
      this.props.callback(stock);
    } else {
      ReactDOM.render(<div className="alert alert-danger" role="alert">Both fields required</div>, $('#validationError')[0]);
    }
  }
  render () {
    return (<form>
            <div className="formgroup">
              <label for="candleType">Candle Type:</label>
              <input className="form-control" id="candleType" />
            </div>
            <div>
              <label for="candleQty">Quantity:</label>
              <input className="form-control" id="candleQty" type="number" />
            </div>
            <button type="submit" onClick={this.handleClick} className="btn btn-primary mt-2">Save</button> 
          </form>);
  }
}

class InventoryRow extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    stock.splice($(e.currentTarget).data('index'), 1);
    this.props.callback();
  }
  render() {
    return (<tr key={this.props.index}>
              <td>{this.props.name}</td>
              <td>{this.props.qty}</td>
              <td><a href="#" onClick={this.handleClick} data-index={this.props.index}>Remove</a></td>
            </tr>
    );
    
  }
}

class InventoryRows extends React.Component {
  constructor(props) {
    super(props);
    this.stateUpdate = this.stateUpdate.bind(this);
  }
  stateUpdate() {
    this.setState();
  }
  render() {
    return (
      <table className="table mt-3">
        <thead>
          <tr>
            <th>
            Candle Type
            </th>
            <th>
              Quantity
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody >
          {stock.map((item, i) =>
              <InventoryRow callback={this.stateUpdate} index={i} name={item.name} qty={item.qty} />
            )}
        </tbody>
      </table>
    ); 
  }
  
}

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.stateUpdate = this.stateUpdate.bind(this);
  }
  
  stateUpdate() {
    this.setState();
  }
  
  render() {
    return (
      <div>
      <InventoryForm callback={this.stateUpdate}/>
      <InventoryRows />
      </div>
      );
  }
}


ReactDOM.render(
  <Inventory />, $('#inventory')[0]
);



