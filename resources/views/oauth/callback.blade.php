<html>

<head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}</title>
    <script>
        window.opener.postMessage({
            id: "{{ $id }}"
        }, "{{ config('app.url') }}")
        window.close()
    </script>
</head>

<body>
</body>

</html>