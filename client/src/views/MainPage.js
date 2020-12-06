import React, { Component } from 'react';
import Header2 from '../components/Header2'
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import { Fade } from '@material-ui/core';

import ShowCard from '../components/ShowCard';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    centered: {
        display: 'flex',
        justifyContent: 'center'
    },
    alphabet: {
        padding: "1px"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        //   backgroundColor: fade(theme.palette.common.white, 0.15),
        //   '&:hover': {
        //     backgroundColor: fade(theme.palette.common.white, 0.25),
        //   },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
});

class MainPage extends Component {

    state = { searchInput: '', alphabet: '' };

    onSearchInputChange = (e) => {
        this.setState({ searchInput: e.target.value })
    }

    onAlphabetClick = (e) => {
        console.log(e.currentTarget.value);
        this.setState({ alphabet: e.currentTarget.value })
    }

    prepareAlphabets = () => {
        let result = [];
        result.push(
        <Button
            size="large"
            style={{ padding: 1.5, minWidth: 0, fontSize: '22px' }}
            key={1}
            onClick={this.onAlphabetClick}
            value={'1'} >
            #
        </Button>
        )
        for (let i = 65; i < 91; i++) {
            result.push(
                <Button
                    size="large"
                    style={{ padding: 1.5, minWidth: 0, fontSize: '22px' }}
                    key={i}
                    onClick={this.onAlphabetClick}
                    value={String.fromCharCode(i)} >
                    {String.fromCharCode(i)}
                </Button>
            )
        }
        return result;
    }

    prepareGenres = () => {

        let genres = [
            "Action",
            "Adventure",
            "Animation",
            "Children",
            "Comedy",
            "Crime",
            "Documentary",
            "Drama",
            "Family",
            "Fantasy",
            "Food",
            "Home and Garden",
            "Horror",
            "Mini-Series",
            "Mystery",
            "News",
            "Reality",
            "Romance",
            "Sci-Fi",
            "Sport",
            "Suspense",
            "Talk Show",
            "Thriller",
            "Travel"
        ]

        let genreButtons = [];


        genres.map(genre => (

            genreButtons.push(
                <Button>
                    {genre}
                </Button>
            )

        ));


        return genreButtons;
    }

    elementContainsSearchString = (searchInput, element) => (searchInput ? element.name.toLowerCase().includes(searchInput.toLowerCase()) : false);

    filterItems = (itemList) => {
        let result = [];
        const { searchInput, alphabet } = this.state;
        if (itemList && (searchInput || alphabet)) {
            result = itemList.filter((element) => (element.name.charAt(0).toLowerCase() === alphabet.toLowerCase()) ||
                this.elementContainsSearchString(searchInput, element));
        } else {
            result = itemList || [];
        }
        result = result.map((item) => (<li>{item.name}</li>))
        return result;
    }
    render() {
        const { classes } = this.props;

        const itemList = [{ id: 1, name: 'abcd' }, { id: 2, name: 'gfhj' }, { id: 3, name: 'fh' }, { id: 4, name: 'zxbv' }, { id: 5, name: 'ewyur' }, { id: 6, name: 'gsdjhbndf' }, { id: 7, name: 'gbhfvd' }, { id: 8, name: 'wgtaqe' }, { id: 1, name: 'ab' }, { id: 1, name: 'bcd' }, { id: 1, name: 'cde' }];


        const filteredList = this.filterItems(itemList);
        return (
            <div className={classes.root}>
                <Header2 />
                <div className={classes.centered}>
                    {this.prepareAlphabets()}
                </div>
                <div >
                    {this.prepareGenres()}
                </div>
                
                <div>
                    <Typography variant="h5">Top 12 Shows</Typography>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        onChange={this.onSearchInputChange}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <ShowCard/>
                <ul>
                    {filteredList}
                </ul>
            </div>
        );
    }
}

export default
    withStyles(styles)(MainPage);