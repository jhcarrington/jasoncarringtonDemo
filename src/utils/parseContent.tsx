export interface PageContent {
    content: Content[]
}

export interface Content {
    type: string,
    lines?: string[],
    listItems?: ListItem[]
}

export interface ListItem {
    text?: string,
    items?: ListItem[]

}

export function parseContent(content: PageContent): JSX.Element[] {

    return content.content.map((c) => {
        switch (c.type) {
            case 'p':
                return parseParagraphContent(c);
            default:
                return <div></div>
        }
    })

}

function parseParagraphContent(content: Content) {
    let pContent: JSX.Element[] = [];
    if (content.lines) {
        const lines = content.lines.map(l => <div>{l}<br /></div>);
        pContent = pContent.concat(lines);
    }
    if (content.listItems) {
        pContent = pContent.concat(parseList(content.listItems));
    }
    return <p>{pContent}</p>
}

function parseList(list: ListItem[]) {
    return list.map((item) => parseListItem(item));
}

function parseListItem(listItem: ListItem): JSX.Element {
    if (listItem.text && !listItem.items) {
        return <li>{listItem.text}</li>
    }

    if (listItem.items) {
        const content = listItem.items.map((i) => parseListItem(i));
        return content.length > 1 ? <li>{listItem.text}<ol>{content}</ol></li> : <li>
            {listItem.text}
            {content}
        </li>;
    }
    return <div></div>
}