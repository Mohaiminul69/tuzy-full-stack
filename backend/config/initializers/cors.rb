Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost:3000' # Vite dev server
  
      resource '*',
        headers: :any,
        methods: [:get, :post, :put, :delete, :options]
    end
  end
  