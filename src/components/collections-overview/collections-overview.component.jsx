import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './collections-overview.styles.scss';

import { selectShopCollections } from '../../redux/shop/shop.selectors'; 

import PreviewCollection from '../preview-collection/preview-collection.component';

const CollectionOverview = ({ collections }) => (
  <div className='collections-overview'>
    {collections.map(({ id, ...collectionProps }) => (
      <PreviewCollection key={id} {...collectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectShopCollections,
  });

export default connect(mapStateToProps)(CollectionOverview);
