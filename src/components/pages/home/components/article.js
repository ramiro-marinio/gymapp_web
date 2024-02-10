import React from 'react'
import styles from './article.module.css'
import noThumbnail from './no_thumbnail.jpg';
function Article(props) {
  return (
      <a className={styles.link} href={props.article['url']} target='_blank'>
        <div className={styles.article}>
            <p className={styles.source}>Source:{props.article['source']}</p>
            <div className={styles.thumbnail} style={{backgroundImage:props.article['image'] ? 'url("'+props.article['image']+'")' : 'url("'+noThumbnail+'")'}}/>
            <div className={styles.textContainer}><h3 align='center'>{props.article['title']}</h3></div>
        </div>
      </a>

  )
}

export default Article