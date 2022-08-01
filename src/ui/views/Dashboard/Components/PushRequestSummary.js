/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardIcon from '../../../components/Card/CardIcon.js';
import CardFooter from '../../../components/Card/CardFooter.js';
import styles from '../../../assets/jss/material-dashboard-react/views/dashboardStyle.js';
import {getPushes} from '../../../services/git-push';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles(styles);

export default function PushRequestSummary(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const query={method: 'POST'};
    getPushes(setIsLoading, setData, setAuth, setIsError, query);
    }, [props]);

    if (isLoading) return (<div>Loading ...</div>);
    if (isError) return (<div>Something went wrong ...</div>);
    if (!auth) return (<Redirect to={{pathname: '/login'}} />);

  return (
    <Card>
      <CardHeader color="success" stats icon>
        <CardIcon color="success">
          <Icon>info_outline</Icon>
        </CardIcon>
        <p className={classes.cardCategory}>Push Requests</p>
        <h3 className={classes.cardTitle}>{data.length}</h3>
      </CardHeader>
      <CardFooter stats>
        <div className={classes.stats}>
          <LocalOffer />
          Push requests from open-source repositories
        </div>
      </CardFooter>
    </Card>
  );
}