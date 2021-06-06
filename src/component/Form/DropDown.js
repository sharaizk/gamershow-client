import React,{useEffect} from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


const DropDown =({changeGender})=> {

  const [state, setState] = React.useState({
    gender: "",
    name: "hai"
  });

  useEffect(()=>{
    if(state.gender !==""){
      changeGender(state.gender)
    }
  },[state.gender, changeGender])

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  return (
    <div>
      <FormControl variant="outlined" className="DropDown">
        <InputLabel htmlFor="outlined-age-native-simple">Gender</InputLabel>
        <Select
          native
          value={state.gender}
          onChange={handleChange}
          label="Gender"
          inputProps={{
            name: "gender",
            id: "outlined-age-native-simple"
          }}
        >
          <option value={"Male"}>Male</option>
          <option value={"Female"}>Female</option>
          <option value={"Prefer Not to Say"}>Prefer Not to Say</option>
        </Select>
      </FormControl>
    </div>
  );
}
export default DropDown