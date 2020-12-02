import React from 'react';
import { Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

        
            const useStyles = makeStyles({
                root: {
                    flexGrow: 1,
                    width: "100%"
                },
                rootCard: {
                    minWidth: 275,
                    maxWidth: 275,
                    position: "absolute",
                    alignItems: "center"
                },
                bullet: {
                    display: 'inline-block',
                    margin: '0 2px',
                    transform: 'scale(0.8)',
                },
                title: {
                    fontSize: 32,
                    color: "#2138A0",
                    marginLeft: "1em",
                    marginTop: "0.5em"
                },
                category: {
                    align: "right",
                    fontSize: 24,
                    color: "#FFFFFF",
                },
                subtitle: {
                    fontSize: 28,
                    color: "#828282",
                },
                inputInput: {
                    background: "#FFFFFF",
                    borderColor: "#BDBDBD",
                    borderWidth: '1px',
                    border: "solid",
                    borderRadius: "2px",
                },
                inputRoot: {
                    flexGrow: 1,
                    marginBottom: "0.5em"
                },
                button: {
                    background: "#FF7D63",
                    borderColor: "#FFFFFF",
                    borderRadius: "20px",
                    marginLeft: "1em",
                    alignSelf: "center",
                    color: "#FFFFFF",
                    marginLeft: "5.5em"
                },
                pos: {
                    marginBottom: 12,
                },
                paper: {
                    background: "linear-gradient(304.84deg, #5776FF -18.57%, #FF947E 102.99%)",
                    maxWidth: "180px",
                    maxHeight: "180px"
                },
                Searchstyle: {
                    margin: '40px',
                    display: 'block',
                    justifyContent: 'center',
                    alignItem: 'center',
                    width: 400,
                    height: 40,
                    textAlign: 'center'
                }
                
            });
            
            
            function Categories() {
                const classes = useStyles();
            
                return (
                    
                    <div className="App">

        <Typography variant="h5" className={classes.title} color="textSecondary" align="left" gutterBottom>
        Categories
</Typography>
</div>
        );
}

export default Categories;