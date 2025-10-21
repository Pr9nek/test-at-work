export default function GeneralErrorPage() {
    return (
        <div style={{ padding: 20, color: 'red' }}>
            <h2>Произошла ошибка загрузки!</h2>
            <p>Не удалось получить данные для этой страницы. Пожалуйста, проверьте подключение к сети.</p>
        </div>
    );
}